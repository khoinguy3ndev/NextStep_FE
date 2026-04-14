import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
  FileText,
  Info,
  MapPin,
  Search,
} from "lucide-react";
import { AppShell } from "@/shared/ui/app-shell";
import { BRAND } from "@/shared/config/brand";

type Job = {
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  goodMatch?: boolean;
  description: string;
  responsibilities: string[];
  requirements: string[];
};

const getJobId = (job: Job) => `${job.title}-${job.company}`;
const getPostedDays = (postedAt: string) => {
  const days = Number.parseInt(postedAt, 10);
  return Number.isNaN(days) ? Number.MAX_SAFE_INTEGER : days;
};

const jobs: Job[] = [
  {
    title: "Backend Engineer",
    company: "International Business Consulting",
    location: "Tokyo, Japan",
    type: "Full-time",
    postedAt: "5 days ago",
    goodMatch: true,
    description:
      "We are seeking a Backend Engineer to join our team and build scalable APIs that power our applications and services.",
    responsibilities: [
      "Design, develop, and maintain scalable APIs.",
      "Collaborate with front-end developers to integrate user-facing elements with server-side logic.",
      "Optimize applications for speed and scalability.",
      "Troubleshoot and debug applications to ensure stable performance.",
      "Write clean, maintainable, and efficient code.",
    ],
    requirements: [
      "3+ years of experience with Node.js or Python.",
      "Strong understanding of API design and development.",
      "Experience with database management and integration.",
      "Familiarity with version control systems such as Git.",
      "Excellent problem-solving and communication skills.",
    ],
  },
  {
    title: "Senior Software Engineer | Hybrid (2 Office / 3 WFH)",
    company: "SPOTTED",
    location: "Tokyo, Japan",
    type: "Full-time",
    postedAt: "11 days ago",
    description:
      "Join a fast-growing tech company building next-generation enterprise software. You will lead feature development across the full stack.",
    responsibilities: [
      "Lead implementation of new software features.",
      "Mentor junior developers and conduct code reviews.",
      "Collaborate with product managers to define requirements.",
      "Participate in architecture decisions and roadmap planning.",
      "Ensure code quality with testing and documentation.",
    ],
    requirements: [
      "5+ years of software engineering experience.",
      "Proficiency in TypeScript, React, and Node.js.",
      "Experience with cloud platforms.",
      "Strong communication in cross-functional teams.",
      "Experience with agile development methodologies.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "LongWave",
    location: "Greater Tokyo Area",
    type: "Full-time",
    postedAt: "11 days ago",
    description:
      "LongWave is looking for a Frontend Developer to build exceptional user experiences for SaaS products.",
    responsibilities: [
      "Build and maintain web apps using React.",
      "Translate UI designs into clean implementations.",
      "Optimize apps for speed and compatibility.",
      "Collaborate with backend engineers on API integration.",
      "Write unit and integration tests.",
    ],
    requirements: [
      "3+ years of experience with React or Vue.",
      "Strong knowledge of HTML, CSS, and JavaScript.",
      "Experience in responsive design.",
      "Familiarity with Git workflows.",
      "Attention to detail and strong UI instincts.",
    ],
  },
  {
    title: "Backend Engineer (TypeScript/Node.js)",
    company: "Huxley",
    location: "Tokyo, Japan",
    type: "Contract",
    postedAt: "21 days ago",
    description:
      "Huxley is sourcing an experienced Backend Engineer with deep TypeScript and Node.js expertise for a finance client.",
    responsibilities: [
      "Develop and maintain microservices.",
      "Integrate with external data providers.",
      "Ensure security and compliance standards.",
      "Write comprehensive API documentation.",
      "Support production incidents and on-call.",
    ],
    requirements: [
      "4+ years of Node.js development experience.",
      "Strong TypeScript proficiency.",
      "Experience with message queues.",
      "Knowledge of financial systems is a plus.",
      "Ability to work in fast-paced environments.",
    ],
  },
  {
    title: "Senior Python Developer (Equity Derivatives)",
    company: "Optimum Solutions Pte Ltd",
    location: "Tokyo, Japan",
    type: "Full-time",
    postedAt: "21 days ago",
    description:
      "We are looking for a Senior Python Developer with experience in equity derivatives to support trading desk systems.",
    responsibilities: [
      "Build and maintain Python-based analytics systems.",
      "Build data pipelines for derivatives pricing models.",
      "Collaborate with quantitative analysts.",
      "Optimize performance for real-time market data.",
      "Participate in design and architecture reviews.",
    ],
    requirements: [
      "5+ years of Python development experience.",
      "Background in equity derivatives or financial markets.",
      "Experience with pandas and NumPy.",
      "Knowledge of SQL and time-series databases.",
      "Strong analytical and problem-solving skills.",
    ],
  },
  {
    title: "Backend Engineer (Chinese-speaker)",
    company: "Huxley",
    location: "Tokyo, Japan",
    type: "Full-time",
    postedAt: "21 days ago",
    description:
      "Huxley is seeking a bilingual Backend Engineer (English and Mandarin) to join a multinational product team.",
    responsibilities: [
      "Design and build RESTful APIs.",
      "Coordinate with Mandarin-speaking stakeholders.",
      "Improve existing backend architecture.",
      "Contribute to database schema and query optimization.",
      "Support QA teams with issue resolution.",
    ],
    requirements: [
      "3+ years of backend development experience.",
      "Fluency in English and Mandarin Chinese.",
      "Proficiency in Java, Go, or Python.",
      "Experience with MySQL or PostgreSQL.",
      "Strong communication and collaboration skills.",
    ],
  },
  {
    title: "Senior Software Engineer | Hybrid (2 Office / 3 WFH)",
    company: "SPOTTED",
    location: "Tokyo, Japan",
    type: "Full-time",
    postedAt: "11 days ago",
    description:
      "Join a fast-growing tech company building next-generation enterprise software. You will lead feature development across the full stack.",
    responsibilities: [
      "Lead implementation of new software features.",
      "Mentor junior developers and conduct code reviews.",
      "Collaborate with product managers to define requirements.",
      "Participate in architecture decisions and roadmap planning.",
      "Ensure code quality with testing and documentation.",
    ],
    requirements: [
      "5+ years of software engineering experience.",
      "Proficiency in TypeScript, React, and Node.js.",
      "Experience with cloud platforms.",
      "Strong communication in cross-functional teams.",
      "Experience with agile development methodologies.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "LongWave",
    location: "Greater Tokyo Area",
    type: "Full-time",
    postedAt: "11 days ago",
    description:
      "LongWave is looking for a Frontend Developer to build exceptional user experiences for SaaS products.",
    responsibilities: [
      "Build and maintain web apps using React.",
      "Translate UI designs into clean implementations.",
      "Optimize apps for speed and compatibility.",
      "Collaborate with backend engineers on API integration.",
      "Write unit and integration tests.",
    ],
    requirements: [
      "3+ years of experience with React or Vue.",
      "Strong knowledge of HTML, CSS, and JavaScript.",
      "Experience in responsive design.",
      "Familiarity with Git workflows.",
      "Attention to detail and strong UI instincts.",
    ],
  },
  {
    title: "Backend Engineer (TypeScript/Node.js)",
    company: "Huxley",
    location: "Tokyo, Japan",
    type: "Contract",
    postedAt: "21 days ago",
    description:
      "Huxley is sourcing an experienced Backend Engineer with deep TypeScript and Node.js expertise for a finance client.",
    responsibilities: [
      "Develop and maintain microservices.",
      "Integrate with external data providers.",
      "Ensure security and compliance standards.",
      "Write comprehensive API documentation.",
      "Support production incidents and on-call.",
    ],
    requirements: [
      "4+ years of Node.js development experience.",
      "Strong TypeScript proficiency.",
      "Experience with message queues.",
      "Knowledge of financial systems is a plus.",
      "Ability to work in fast-paced environments.",
    ],
  },
  {
    title: "Senior Python Developer (Equity Derivatives)",
    company: "Optimum Solutions Pte Ltd",
    location: "Tokyo, Japan",
    type: "Full-time",
    postedAt: "21 days ago",
    description:
      "We are looking for a Senior Python Developer with experience in equity derivatives to support trading desk systems.",
    responsibilities: [
      "Build and maintain Python-based analytics systems.",
      "Build data pipelines for derivatives pricing models.",
      "Collaborate with quantitative analysts.",
      "Optimize performance for real-time market data.",
      "Participate in design and architecture reviews.",
    ],
    requirements: [
      "5+ years of Python development experience.",
      "Background in equity derivatives or financial markets.",
      "Experience with pandas and NumPy.",
      "Knowledge of SQL and time-series databases.",
      "Strong analytical and problem-solving skills.",
    ],
  },
  {
    title: "Backend Engineer (Chinese-speaker)",
    company: "Huxley",
    location: "Tokyo, Japan",
    type: "Full-time",
    postedAt: "21 days ago",
    description:
      "Huxley is seeking a bilingual Backend Engineer (English and Mandarin) to join a multinational product team.",
    responsibilities: [
      "Design and build RESTful APIs.",
      "Coordinate with Mandarin-speaking stakeholders.",
      "Improve existing backend architecture.",
      "Contribute to database schema and query optimization.",
      "Support QA teams with issue resolution.",
    ],
    requirements: [
      "3+ years of backend development experience.",
      "Fluency in English and Mandarin Chinese.",
      "Proficiency in Java, Go, or Python.",
      "Experience with MySQL or PostgreSQL.",
      "Strong communication and collaboration skills.",
    ],
  },
];

type DropdownName = "mode" | "date" | "type" | "remote" | "sort" | null;
type SortBy = "relevance" | "date";

export function JobsPage() {
  const [selectedJobId, setSelectedJobId] = useState(getJobId(jobs[0]));
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [searchMode, setSearchMode] = useState<"resume" | "keyword">("resume");
  const [sortBy, setSortBy] = useState<SortBy>("relevance");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [leftPanelHeight, setLeftPanelHeight] = useState<number | null>(null);
  const rightPanelRef = useRef<HTMLElement | null>(null);

  const visibleJobs = useMemo(() => {
    if (sortBy === "date") {
      return [...jobs].sort(
        (a, b) => getPostedDays(a.postedAt) - getPostedDays(b.postedAt),
      );
    }

    return jobs;
  }, [sortBy]);

  const selectedJob =
    visibleJobs.find((job) => getJobId(job) === selectedJobId) ??
    visibleJobs[0];

  const keywordPlaceholder = useMemo(() => {
    if (searchMode === "resume") {
      return "AI is recommending jobs based on your resume";
    }

    return "Job title, keywords, or company";
  }, [searchMode]);

  const toggleDropdown = (name: DropdownName) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => setOpenDropdown(null);

  useEffect(() => {
    const syncPanelHeight = () => {
      if (!rightPanelRef.current) return;
      setLeftPanelHeight(Math.ceil(rightPanelRef.current.offsetHeight));
    };

    syncPanelHeight();

    const observer = new ResizeObserver(() => {
      syncPanelHeight();
    });

    if (rightPanelRef.current) {
      observer.observe(rightPanelRef.current);
    }

    window.addEventListener("resize", syncPanelHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncPanelHeight);
    };
  }, [selectedJobId]);

  return (
    <AppShell fullWidth>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <section className="border-b border-border bg-muted p-5 pb-4">
          <h2 className="text-[22px] font-bold text-foreground">
            AI Job Match
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Get personalized skills and qualifications, and let {BRAND.name}{" "}
            match your best-fit jobs.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="relative flex min-w-[340px] flex-1 items-center">
              <button
                type="button"
                onClick={() => toggleDropdown("mode")}
                className="flex h-10 items-center gap-1 rounded-l-lg border border-r-0 border-border bg-card px-3 text-xs font-medium text-foreground hover:border-foreground"
              >
                {searchMode === "resume" ? (
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <Search className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span>{searchMode === "resume" ? "Resume" : "Keywords"}</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={keywordPlaceholder}
                readOnly={searchMode === "resume"}
                className="h-10 flex-1 rounded-r-lg border border-border px-3 text-xs text-muted-foreground outline-none focus:border-foreground"
              />

              {openDropdown === "mode" && (
                <div className="absolute left-0 top-[44px] z-20 w-44 rounded-lg border border-border bg-card py-1 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchMode("resume");
                      closeDropdown();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
                  >
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    Use my resume
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchMode("keyword");
                      closeDropdown();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
                  >
                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                    Search by keyword
                  </button>
                </div>
              )}
            </div>

            <div className="relative w-[220px]">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your current location"
                className="h-10 w-full rounded-lg border border-border py-2 pl-9 pr-3 text-xs outline-none focus:border-foreground"
              />
            </div>

            <button
              type="button"
              className="h-10 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Search
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("date")}
                className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                Date range
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openDropdown === "date" && (
                <div className="absolute left-0 top-[34px] z-20 w-36 rounded-lg border border-border bg-card py-1 shadow-lg">
                  {["Last 3 days", "Last week", "Last month", "Any time"].map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={closeDropdown}
                        className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("type")}
                className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                Job type
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openDropdown === "type" && (
                <div className="absolute left-0 top-[34px] z-20 w-36 rounded-lg border border-border bg-card py-1 shadow-lg">
                  {[
                    "Full-time",
                    "Part-time",
                    "Contract",
                    "Internship",
                    "Temporary",
                    "Volunteer",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={closeDropdown}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("remote")}
                className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                Remote option
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openDropdown === "remote" && (
                <div className="absolute left-0 top-[34px] z-20 w-32 rounded-lg border border-border bg-card py-1 shadow-lg">
                  {["On-site", "Hybrid", "Remote"].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={closeDropdown}
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setKeyword("");
                setLocation("");
                closeDropdown();
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          </div>
        </section>

        <section className="bg-background p-5">
          <div className="mb-4 flex items-start gap-2 text-sm leading-relaxed text-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              Your ATS match rate may be different. NextStepAI uses AI for
              smarter matching. Use Scan to spot missing keywords and improve
              your ATS match rate.
            </p>
          </div>

          <div
            className="grid items-start gap-4"
            style={{ gridTemplateColumns: "340px minmax(0, 1fr)" }}
          >
            <aside
              className="overflow-hidden rounded-xl border border-border bg-card flex flex-col"
              style={
                leftPanelHeight ? { height: `${leftPanelHeight}px` } : undefined
              }
            >
              <div className="relative border-b border-border px-4 py-3">
                <button
                  type="button"
                  onClick={() => toggleDropdown("sort")}
                  className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  <ChevronsUpDown className="h-3.5 w-3.5" />
                  {sortBy === "relevance" ? "Relevance" : "Date"}
                </button>

                {openDropdown === "sort" && (
                  <div className="absolute left-4 top-12 z-20 w-[200px] overflow-hidden rounded-lg border border-border bg-card shadow-lg">
                    <div className="border-b border-border px-4 py-2.5 text-sm text-muted-foreground">
                      Sort by
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("relevance");
                        closeDropdown();
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-foreground hover:bg-muted ${
                        sortBy === "relevance"
                          ? "bg-accent text-accent-foreground"
                          : "bg-card"
                      }`}
                    >
                      Relevance
                      {sortBy === "relevance" && <Check className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("date");
                        closeDropdown();
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-foreground hover:bg-muted ${
                        sortBy === "date" ? "bg-muted" : "bg-card"
                      }`}
                    >
                      Date
                      {sortBy === "date" && <Check className="h-4 w-4" />}
                    </button>
                  </div>
                )}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-3">
                {visibleJobs.map((job) => {
                  const jobId = getJobId(job);
                  const isActive = selectedJobId === jobId;

                  return (
                    <button
                      key={jobId}
                      type="button"
                      onClick={() => setSelectedJobId(jobId)}
                      className={`mb-2 w-full rounded-xl border p-4 text-left transition-colors ${
                        isActive
                          ? "border-primary/40 bg-accent"
                          : "border-border bg-card hover:bg-background"
                      }`}
                    >
                      {job.goodMatch && (
                        <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-[11px] font-semibold text-accent-foreground">
                          <Check className="h-3 w-3 text-primary" /> Good Match
                        </span>
                      )}

                      <div
                        className={`text-sm font-semibold ${
                          isActive ? "text-foreground" : "text-foreground"
                        }`}
                      >
                        {job.title}
                      </div>
                      <div className="mt-0.5 text-xs font-medium text-foreground">
                        {job.company}
                      </div>
                      <div className="mt-0.5 text-xs text-muted-foreground">
                        {job.location}
                      </div>
                      <div className="mt-1 text-[11px] text-muted-foreground/60">
                        {job.postedAt}
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <article
              ref={rightPanelRef}
              className="rounded-xl border border-border bg-card"
            >
              <div className="border-b border-border px-6 pb-4 pt-5">
                <h3 className="text-2xl font-bold text-foreground">
                  {selectedJob.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  {selectedJob.company}
                </p>

                <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    {selectedJob.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-muted-foreground" />
                    {selectedJob.type}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Scan
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                    Save Job
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Apply
                  </button>
                </div>
              </div>

              <div className="px-6 py-5 text-sm leading-relaxed text-foreground">
                <p className="mb-3 font-medium text-foreground">
                  Job Description
                </p>
                <p className="mb-4">{selectedJob.description}</p>

                <h4 className="mb-2 font-semibold text-foreground">
                  Responsibilities
                </h4>
                <ul className="mb-4 space-y-1.5">
                  {selectedJob.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-foreground">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="mb-2 font-semibold text-foreground">
                  Requirements
                </h4>
                <ul className="space-y-1.5">
                  {selectedJob.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </section>
      </div>

      {openDropdown && (
        <button
          type="button"
          aria-label="close dropdown"
          onClick={closeDropdown}
          className="fixed inset-0 z-10 cursor-default"
        />
      )}
    </AppShell>
  );
}
