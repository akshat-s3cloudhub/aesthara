import { CheckCircle, Instagram, Linkedin, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

export default function Footer() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      setError("Not connected. Please try again.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await actor.submitContactForm(
        form.firstName,
        form.lastName,
        form.email,
        form.company || "(not provided)",
        form.message,
      );
      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative overflow-hidden bg-[#094185]">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="footerGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)" />
        </svg>
        {/* Constellation lines */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <line
            x1="5%"
            y1="10%"
            x2="20%"
            y2="30%"
            stroke="rgba(255,195,46,0.15)"
            strokeWidth="1"
          />
          <line
            x1="20%"
            y1="30%"
            x2="35%"
            y2="15%"
            stroke="rgba(255,195,46,0.15)"
            strokeWidth="1"
          />
          <line
            x1="35%"
            y1="15%"
            x2="50%"
            y2="40%"
            stroke="rgba(255,195,46,0.15)"
            strokeWidth="1"
          />
          <line
            x1="50%"
            y1="40%"
            x2="65%"
            y2="20%"
            stroke="rgba(255,195,46,0.15)"
            strokeWidth="1"
          />
          <line
            x1="65%"
            y1="20%"
            x2="80%"
            y2="45%"
            stroke="rgba(255,195,46,0.15)"
            strokeWidth="1"
          />
          <line
            x1="80%"
            y1="45%"
            x2="95%"
            y2="25%"
            stroke="rgba(255,195,46,0.15)"
            strokeWidth="1"
          />
          <line
            x1="10%"
            y1="60%"
            x2="25%"
            y2="80%"
            stroke="rgba(255,195,46,0.1)"
            strokeWidth="1"
          />
          <line
            x1="25%"
            y1="80%"
            x2="45%"
            y2="65%"
            stroke="rgba(255,195,46,0.1)"
            strokeWidth="1"
          />
          <line
            x1="45%"
            y1="65%"
            x2="60%"
            y2="85%"
            stroke="rgba(255,195,46,0.1)"
            strokeWidth="1"
          />
          <line
            x1="60%"
            y1="85%"
            x2="75%"
            y2="60%"
            stroke="rgba(255,195,46,0.1)"
            strokeWidth="1"
          />
          <line
            x1="75%"
            y1="60%"
            x2="90%"
            y2="75%"
            stroke="rgba(255,195,46,0.1)"
            strokeWidth="1"
          />
          <line
            x1="5%"
            y1="10%"
            x2="10%"
            y2="60%"
            stroke="rgba(255,195,46,0.08)"
            strokeWidth="1"
          />
          <line
            x1="35%"
            y1="15%"
            x2="45%"
            y2="65%"
            stroke="rgba(255,195,46,0.08)"
            strokeWidth="1"
          />
          <line
            x1="65%"
            y1="20%"
            x2="75%"
            y2="60%"
            stroke="rgba(255,195,46,0.08)"
            strokeWidth="1"
          />
          {/* Glowing dots */}
          <circle cx="5%" cy="10%" r="3" fill="rgba(255,195,46,0.4)" />
          <circle cx="20%" cy="30%" r="2" fill="rgba(255,195,46,0.3)" />
          <circle cx="35%" cy="15%" r="3" fill="rgba(255,195,46,0.4)" />
          <circle cx="50%" cy="40%" r="2" fill="rgba(223,159,87,0.3)" />
          <circle cx="65%" cy="20%" r="3" fill="rgba(255,195,46,0.4)" />
          <circle cx="80%" cy="45%" r="2" fill="rgba(255,195,46,0.3)" />
          <circle cx="95%" cy="25%" r="3" fill="rgba(223,159,87,0.4)" />
          <circle cx="10%" cy="60%" r="2" fill="rgba(255,195,46,0.3)" />
          <circle cx="25%" cy="80%" r="3" fill="rgba(255,195,46,0.4)" />
          <circle cx="45%" cy="65%" r="2" fill="rgba(223,159,87,0.3)" />
          <circle cx="60%" cy="85%" r="3" fill="rgba(255,195,46,0.4)" />
          <circle cx="75%" cy="60%" r="2" fill="rgba(255,195,46,0.3)" />
          <circle cx="90%" cy="75%" r="3" fill="rgba(223,159,87,0.4)" />
        </svg>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#094185] via-[#005280]/90 to-[#094185]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left column */}
          <div className="order-2 lg:order-1 space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Ready to make your brand stand out?
              </h3>
              <p className="text-lg text-white/80">
                Let&apos;s turn your vision into{" "}
                <strong className="text-[#FFC32E]">striking visuals.</strong>
              </p>
            </div>
            <div className="space-y-6">
              <img
                src="/assets/Aesthara white.png"
                alt="Aesthara"
                className="h-12 md:h-14 w-auto object-contain"
              />
              <div className="flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/company/aesthara-cs/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/aesthara_creative_solutions/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
              </div>
              <p className="text-white/60 text-sm">Mumbai | India</p>
            </div>
          </div>

          {/* Right column / Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 md:p-8">
              {success ? (
                <div
                  data-ocid="contact.success_state"
                  className="flex flex-col items-center justify-center text-center py-10"
                >
                  <CheckCircle className="w-14 h-14 text-[#FFC32E] mb-4" />
                  <h3 className="text-white text-2xl font-bold">Thank you!</h3>
                  <p className="text-white/70 mt-2">
                    We&apos;ll be in touch soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="mt-6 text-[#FFC32E] underline text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h4 className="text-xl font-bold text-white mb-6">
                    Get in Touch
                  </h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Name"
                        data-ocid="contact.input"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50"
                      />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        data-ocid="contact.input"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50"
                      />
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Company"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50"
                      />
                    </div>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      data-ocid="contact.textarea"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-[#FFC32E] focus:ring-2 focus:ring-[#FFC32E]/20 transition-all outline-none text-white placeholder-white/50 resize-none"
                    />
                    {error && (
                      <p
                        data-ocid="contact.error_state"
                        className="text-red-400 text-sm"
                      >
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      data-ocid="contact.submit_button"
                      className="w-full bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] px-6 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-60"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">Aesthara © {year}</p>
          <button
            type="button"
            className="text-white/40 hover:text-white/60 text-sm transition-colors"
          >
            Privacy Policy
          </button>
          <p className="text-white/30 text-xs">
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white/50 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
