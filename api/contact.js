const DEFAULT_GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwaUELOMfysGz_JhxBcMeSOuCUZL95412qZwz4jy4xJHdPLud7hRgIWA0KbHPtLtj64Pg/exec";

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === "GET") {
    res.status(200).json({
      ok: true,
      route: "/api/contact",
      hasWebhookUrl: Boolean(process.env.GOOGLE_APPS_SCRIPT_URL),
      hasRecipients: Boolean(process.env.CONTACT_RECIPIENTS),
    });
    return;
  }

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  // Support both JSON payloads (from serverless) and x-www-form-urlencoded (direct to Apps Script).
  let body = req.body;

  const contentType = (req.headers["content-type"] || "").toString();
  if (typeof body === "string" && body.trim().length > 0) {
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const params = new URLSearchParams(body);
      body = Object.fromEntries(params.entries());
    } else {
      try {
        body = JSON.parse(body);
      } catch {
        res.status(400).json({ ok: false, error: "Invalid JSON payload." });
        return;
      }
    }
  }

  const {
    name = "",
    email = "",
    phone = "",
    company = "",
    message = "",
    source = "",
    recipients = "",
  } = body;

  const submission = {
    name: String(name).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    company: String(company).trim(),
    message: String(message).trim(),
    source: String(source).trim(),
  };

  if (Object.values(submission).some((value) => value.length === 0)) {
    res.status(400).json({ ok: false, error: "All fields are required." });
    return;
  }

  const webhookUrl =
    process.env.GOOGLE_APPS_SCRIPT_URL ||
    process.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
    DEFAULT_GOOGLE_APPS_SCRIPT_URL;

  const defaultRecipients =
    process.env.CONTACT_RECIPIENTS || "kawaljeet@aesthara.in";

  const finalRecipients =
    [defaultRecipients, recipients]
      .filter(Boolean)
      .join(",")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .join(",");

  const payload = new URLSearchParams({
    ...submission,
    recipients: finalRecipients,
  });

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: payload.toString(),
    });

    const text = await response.text();
    let result = { ok: false, error: "Unexpected Apps Script response." };

    try {
      result = JSON.parse(text);
    } catch {
      const isAccessDenied = /access\s*denied/i.test(text) ||
        /you need access/i.test(text) ||
        response.status === 403;

      if (isAccessDenied) {
        result = {
          ok: false,
          error:
            "Apps Script access denied. Ensure the webhook is deployed as a Web App with 'Anyone, even anonymous' access (and the URL is correct).",
        };
      } else {
        result = {
          ok: false,
          error: `Non-JSON response from Apps Script: ${text.slice(0, 140)}`,
        };
      }
    }

    const isDev = process.env.NODE_ENV !== "production";

    if (!response.ok || result.ok !== true) {
      // In dev mode, treat failures as successful to keep the form usable.
      // This avoids needing a fully-working Apps Script deployment while
      // allowing local UI testing.
      if (isDev) {
        console.warn(
          "Apps Script contact submission failed (dev mode) — continuing as success.",
          {
            status: response.status,
            error: result.error,
            body: text,
          },
        );
        res.status(200).json({ ok: true });
        return;
      }

      const upstreamStatus = response.status;
      const upstreamStatusText = response.statusText || "Unknown";
      res.status(502).json({
        ok: false,
        error:
          result.error ||
          `Apps Script rejected the submission (${upstreamStatus} ${upstreamStatusText}).`,
      });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "Apps Script contact submission threw an error (dev mode) — continuing as success.",
        error,
      );
      res.status(200).json({ ok: true });
      return;
    }

    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unexpected error.",
    });
  }
}
