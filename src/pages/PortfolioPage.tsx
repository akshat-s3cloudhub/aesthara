import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "@tanstack/react-router";
import { ArrowUpRight, Layers, X } from "lucide-react";
import { useState } from "react";

type Category = "All" | "Branding" | "Graphic Design" | "Presentations";

interface Project {
  id: number;
  title: string;
  img: string;
  category: Category;
  badge: string;
  badgeColor: string;
  desc: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Raasa Healthy Foods",
    img: "/assets/Raasa healthy foods.png",
    category: "Branding",
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Logo design for a healthy food startup specializing in fresh salads and nutritious drinks.",
  },
  {
    id: 2,
    title: "Ambaa's Farm Fresh",
    img: "/assets/Amba Farm Fresh.png",
    category: "Branding",
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Brand identity development and social media creatives and for an organic dairy brand offering ghee and unsalted butter.",
  },
  {
    id: 3,
    title: "Voice Of Healthy Meals (VOHM)",
    img: "/assets/VOHM.png",
    category: "Branding",
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Logo design and brand guidelines for a healthy snacks' startup focused on nutritious food options.",
  },
  {
    id: 4,
    title: "Corporate Presentation",
    img: "/assets/PPT Sample 1.png",
    category: "Presentations",
    badge: "Presentations",
    badgeColor: "bg-[#005280]",
    desc: "Designed a professional corporate presentation for an Agentic AI platform and cloud automation startup.",
  },
  {
    id: 5,
    title: "Pitch Deck Design",
    img: "/assets/PPT Sample 2.png",
    category: "Presentations",
    badge: "Presentations",
    badgeColor: "bg-[#005280]",
    desc: "Created an investor-ready pitch deck for a Direct-to-Consumer (D2C) brand and business storytelling.",
  },
  {
    id: 6,
    title: "Marketing assets",
    img: "/assets/Graphic Design Services.png",
    category: "Graphic Design",
    badge: "Graphic Design",
    badgeColor: "bg-[#53BA7C]",
    desc: "Digital Assets for IT & Technology Industry",
  },
  {
    id: 7,
    title: "Wall Branding",
    img: "/assets/Wall branding.png",
    category: "Branding",
    badge: "Branding",
    badgeColor: "bg-[#DF9F57]",
    desc: "Creative wall branding and large format print design.",
  },
];

export default function PortfolioPage() {
  const [active, setActive] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const router = useRouter();
  const filters: Category[] = [
    "All",
    "Branding",
    "Graphic Design",
    "Presentations",
  ];
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  const handleGetInTouch = () => {
    router.navigate({ to: "/" });
    setTimeout(() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#005280] via-[#094185] to-[#005280] overflow-hidden">
        <div
          className="absolute w-[400px] h-[400px] -top-20 -left-20 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(9,65,133,0.6) 0%, rgba(0,82,128,0.3) 50%, transparent 70%)",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] bottom-0 right-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(223,159,87,0.4) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 text-[#DF9F57] font-semibold mb-4 text-sm tracking-widest uppercase">
            <Layers className="w-4 h-4" />
            Our Portfolio
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Work That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DF9F57] to-[#FFC32E]">
              Inspires
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A showcase of our design expertise across branding, graphic design,
            and presentations.
          </p>
        </div>
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="w-full h-16 md:h-20"
          >
            <path
              d="M0 80L1440 80L1440 40C1200 0 960 60 720 60C480 60 240 0 0 40L0 80Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Description + Filters + Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-gray-600 leading-relaxed">
              <strong>Aesthara</strong> delivers tailored design and creative
              solutions across industries, partnering with marketing agencies,
              startups, entrepreneurs, and enterprise firms through
              project-based engagements, long-term retainers, and dedicated
              service models.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                data-ocid="portfolio.filter.tab"
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === f
                    ? "bg-gradient-to-r from-[#094185] to-[#005280] text-white shadow-lg shadow-[#094185]/25"
                    : "bg-slate-100 text-[#094185] hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <div
                key={project.id}
                data-ocid="portfolio.project.open_modal_button"
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer"
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedProject(project);
                  }
                }}
                aria-label={`View details for ${project.title}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#094185]/0 group-hover:bg-[#094185]/40 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-semibold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      View Details
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`${project.badgeColor} px-3 py-1.5 rounded-full text-xs font-semibold text-white`}
                    >
                      {project.badge}
                    </span>
                  </div>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="text-lg font-bold text-[#094185] mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              data-ocid="portfolio.empty_state"
              className="text-center py-20 text-gray-400"
            >
              No projects found for this category.
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-16">
            <p className="text-2xl font-bold text-[#094185] mb-6">
              Ready to start your next project?
            </p>
            <button
              type="button"
              onClick={handleGetInTouch}
              data-ocid="portfolio.primary_button"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#DF9F57] to-[#FFC32E] text-[#094185] px-8 py-4 rounded-full font-semibold text-base shadow-lg shadow-[#DF9F57]/25 hover:shadow-xl hover:shadow-[#DF9F57]/30 transition-all"
            >
              Start Your Project
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      >
        <DialogContent
          data-ocid="portfolio.project.dialog"
          className="max-w-lg p-0 overflow-hidden rounded-2xl border-0 shadow-2xl"
        >
          {selectedProject && (
            <>
              {/* Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#094185]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`${selectedProject.badgeColor} px-3 py-1.5 rounded-full text-xs font-semibold text-white`}
                  >
                    {selectedProject.badge}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  data-ocid="portfolio.project.close_button"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <DialogHeader className="mb-3">
                  <DialogTitle className="text-xl font-bold text-[#094185] leading-snug">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {selectedProject.desc}
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    data-ocid="portfolio.project.cancel_button"
                    className="px-5 py-2 rounded-full text-sm font-semibold text-[#094185] border-2 border-[#094185]/20 hover:border-[#094185]/50 hover:bg-[#094185]/5 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
