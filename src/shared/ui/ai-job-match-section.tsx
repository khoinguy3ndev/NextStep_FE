import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronsUpDown,
  ExternalLink,
  FileText,
  Info,
  Lock,
  MapPin,
  Search,
  Star,
  X,
} from "lucide-react";
import { BRAND } from "@/shared/config/brand";
import { mockJobs, type MockJob } from "@/shared/config/mock-jobs";

const jobs: MockJob[] = mockJobs;

type DropdownName = "mode" | "date" | "type" | "remote" | "sort" | null;
type SortBy = "relevance" | "date";
type DateRangeFilter = "any" | "3d" | "7d" | "30d";
type JobTypeFilter =
  | "all"
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship"
  | "Temporary"
  | "Volunteer";
type RemoteFilter = "all" | "on-site" | "hybrid" | "remote";

const DATE_RANGE_OPTIONS: Array<{ value: DateRangeFilter; label: string }> = [
  { value: "3d", label: "Last 3 days" },
  { value: "7d", label: "Last week" },
  { value: "30d", label: "Last month" },
  { value: "any", label: "Any time" },
];

const JOB_TYPE_OPTIONS: JobTypeFilter[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Temporary",
  "Volunteer",
];

const REMOTE_OPTIONS: Array<{ value: RemoteFilter; label: string }> = [
  { value: "on-site", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
];

type AiJobMatchSectionProps = {
  hasScan: boolean;
  onCreateScan?: () => void;
};

function getPostedDays(postedAt: string) {
  const posted = new Date(postedAt).getTime();
  if (Number.isNaN(posted)) return Number.MAX_SAFE_INTEGER;
  const diffMs = Date.now() - posted;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

function formatPosted(postedAt: string) {
  const postedDays = getPostedDays(postedAt);
  if (postedDays <= 1) return "1 day ago";
  return `${postedDays} days ago`;
}

type AiJobUrlFilters = {
  searchMode: "resume" | "keyword";
  sortBy: SortBy;
  dateRange: DateRangeFilter;
  jobTypeFilter: JobTypeFilter;
  remoteFilter: RemoteFilter;
  keyword: string;
  location: string;
};

function readAiJobFiltersFromUrl(): AiJobUrlFilters {
  if (typeof window === "undefined") {
    return {
      searchMode: "resume" as const,
      sortBy: "relevance" as SortBy,
      dateRange: "any" as DateRangeFilter,
      jobTypeFilter: "all" as JobTypeFilter,
      remoteFilter: "all" as RemoteFilter,
      keyword: "",
      location: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const sort = params.get("sort");
  const date = params.get("date");
  const type = params.get("type");
  const remote = params.get("remote");

  return {
    searchMode: mode === "keyword" ? "keyword" : "resume",
    sortBy: sort === "date" ? "date" : "relevance",
    dateRange: date === "3d" || date === "7d" || date === "30d" ? date : "any",
    jobTypeFilter: (JOB_TYPE_OPTIONS.includes(type as JobTypeFilter)
      ? type
      : "all") as JobTypeFilter,
    remoteFilter: (REMOTE_OPTIONS.some((item) => item.value === remote)
      ? remote
      : "all") as RemoteFilter,
    keyword: params.get("q") ?? "",
    location: params.get("loc") ?? "",
  };
}

export function AiJobMatchSection({
  hasScan,
  onCreateScan,
}: AiJobMatchSectionProps) {
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [searchMode, setSearchMode] = useState<"resume" | "keyword">(
    () => readAiJobFiltersFromUrl().searchMode,
  );
  const [sortBy, setSortBy] = useState<SortBy>(
    () => readAiJobFiltersFromUrl().sortBy,
  );
  const [dateRange, setDateRange] = useState<DateRangeFilter>(
    () => readAiJobFiltersFromUrl().dateRange,
  );
  const [jobTypeFilter, setJobTypeFilter] = useState<JobTypeFilter>(
    () => readAiJobFiltersFromUrl().jobTypeFilter,
  );
  const [remoteFilter, setRemoteFilter] = useState<RemoteFilter>(
    () => readAiJobFiltersFromUrl().remoteFilter,
  );
  const [keyword, setKeyword] = useState(
    () => readAiJobFiltersFromUrl().keyword,
  );
  const [location, setLocation] = useState(
    () => readAiJobFiltersFromUrl().location,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [previewJobId, setPreviewJobId] = useState<string | null>(null);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
    setCurrentPage(1);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortBy) => {
    setSortBy(value);
    setCurrentPage(1);
    closeDropdown();
  };

  const handleDateRangeChange = (value: DateRangeFilter) => {
    setDateRange(value);
    setCurrentPage(1);
    closeDropdown();
  };

  const handleJobTypeChange = (value: JobTypeFilter) => {
    setJobTypeFilter(value);
    setCurrentPage(1);
    closeDropdown();
  };

  const handleRemoteChange = (value: RemoteFilter) => {
    setRemoteFilter(value);
    setCurrentPage(1);
    closeDropdown();
  };

  const keywordPlaceholder =
    searchMode === "resume"
      ? "AI is recommending jobs based on your resume"
      : "Job title, keywords, or company";

  const toggleDropdown = (name: DropdownName) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => setOpenDropdown(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    if (searchMode !== "resume") params.set("mode", searchMode);
    else params.delete("mode");

    if (sortBy !== "relevance") params.set("sort", sortBy);
    else params.delete("sort");

    if (dateRange !== "any") params.set("date", dateRange);
    else params.delete("date");

    if (jobTypeFilter !== "all") params.set("type", jobTypeFilter);
    else params.delete("type");

    if (remoteFilter !== "all") params.set("remote", remoteFilter);
    else params.delete("remote");

    const normalizedKeyword = keyword.trim();
    if (normalizedKeyword) params.set("q", normalizedKeyword);
    else params.delete("q");

    const normalizedLocation = location.trim();
    if (normalizedLocation) params.set("loc", normalizedLocation);
    else params.delete("loc");

    const nextSearch = params.toString();
    const currentSearch = window.location.search.startsWith("?")
      ? window.location.search.slice(1)
      : window.location.search;

    if (nextSearch === currentSearch) return;

    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [
    searchMode,
    sortBy,
    dateRange,
    jobTypeFilter,
    remoteFilter,
    keyword,
    location,
  ]);

  const visibleJobs = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();

    let filtered = jobs.filter((job) => {
      const postedDays = getPostedDays(job.postedAt);

      const matchesKeyword =
        !normalizedKeyword ||
        job.title.toLowerCase().includes(normalizedKeyword) ||
        job.company.toLowerCase().includes(normalizedKeyword);

      const matchesLocation =
        !normalizedLocation ||
        job.location.toLowerCase().includes(normalizedLocation);

      const matchesDateRange =
        dateRange === "any" ||
        (dateRange === "3d" && postedDays <= 3) ||
        (dateRange === "7d" && postedDays <= 7) ||
        (dateRange === "30d" && postedDays <= 30);

      const matchesJobType =
        jobTypeFilter === "all" || job.jobType === jobTypeFilter;

      const matchesRemote =
        remoteFilter === "all" || job.remoteOption === remoteFilter;

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesDateRange &&
        matchesJobType &&
        matchesRemote
      );
    });

    if (sortBy === "date") {
      filtered = [...filtered].sort(
        (a, b) => getPostedDays(a.postedAt) - getPostedDays(b.postedAt),
      );
    }

    return filtered;
  }, [keyword, location, sortBy, dateRange, jobTypeFilter, remoteFilter]);

  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(visibleJobs.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedJobs = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return visibleJobs.slice(start, start + pageSize);
  }, [safeCurrentPage, visibleJobs]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, idx) => idx + 1),
    [totalPages],
  );

  const previewJob = useMemo(
    () => jobs.find((job) => job.id === previewJobId) ?? null,
    [previewJobId],
  );

  const openJobPreview = (job: MockJob) => {
    if (job.locked) return;
    closeDropdown();
    setPreviewJobId(job.id);
  };

  const closeJobPreview = () => setPreviewJobId(null);

  useEffect(() => {
    if (!previewJob) return;

    const shellScrollContainer = document.getElementById(
      "app-shell-scroll-container",
    );
    const previousShellOverflowY = shellScrollContainer?.style.overflowY;
    const previousShellPaddingRight = shellScrollContainer?.style.paddingRight;

    if (shellScrollContainer) {
      const scrollbarWidth =
        shellScrollContainer.offsetWidth - shellScrollContainer.clientWidth;
      const computedPaddingRight = Number.parseFloat(
        window.getComputedStyle(shellScrollContainer).paddingRight,
      );

      shellScrollContainer.style.overflowY = "hidden";
      if (scrollbarWidth > 0) {
        shellScrollContainer.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
      }
    }

    return () => {
      if (shellScrollContainer) {
        shellScrollContainer.style.overflowY = previousShellOverflowY ?? "";
        shellScrollContainer.style.paddingRight =
          previousShellPaddingRight ?? "";
      }
    };
  }, [previewJob]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <section className="border-b border-border bg-muted p-5 pb-4">
        <h2 className="text-[22px] font-bold text-foreground">AI Job Match</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Get personalized skills and qualifications, and let {BRAND.name} match
          your best-fit jobs.
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
              onChange={(e) => handleKeywordChange(e.target.value)}
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
              onChange={(e) => handleLocationChange(e.target.value)}
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
              {DATE_RANGE_OPTIONS.find((item) => item.value === dateRange)
                ?.label ?? "Date range"}{" "}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {openDropdown === "date" && (
              <div className="absolute left-0 top-[34px] z-20 w-36 rounded-lg border border-border bg-card py-1 shadow-lg">
                {DATE_RANGE_OPTIONS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleDateRangeChange(item.value)}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("type")}
              className="flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
            >
              {jobTypeFilter === "all" ? "Job type" : jobTypeFilter}{" "}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {openDropdown === "type" && (
              <div className="absolute left-0 top-[34px] z-20 w-36 rounded-lg border border-border bg-card py-1 shadow-lg">
                {JOB_TYPE_OPTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleJobTypeChange(item)}
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
              {REMOTE_OPTIONS.find((item) => item.value === remoteFilter)
                ?.label ?? "Remote option"}{" "}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {openDropdown === "remote" && (
              <div className="absolute left-0 top-[34px] z-20 w-32 rounded-lg border border-border bg-card py-1 shadow-lg">
                {REMOTE_OPTIONS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleRemoteChange(item.value)}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              handleKeywordChange("");
              setLocation("");
              setDateRange("any");
              setJobTypeFilter("all");
              setRemoteFilter("all");
              setCurrentPage(1);
              closeDropdown();
            }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </button>

          <div className="ml-auto relative">
            <button
              type="button"
              onClick={() => toggleDropdown("sort")}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ChevronsUpDown className="h-3.5 w-3.5" />
              {sortBy === "relevance" ? "Relevance" : "Date"}
            </button>
            {openDropdown === "sort" && (
              <div className="absolute right-0 top-[24px] z-20 w-[160px] overflow-hidden rounded-lg border border-border bg-card shadow-lg">
                {(["relevance", "date"] as const).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleSortChange(val)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted ${
                      sortBy === val
                        ? "bg-accent text-accent-foreground"
                        : "bg-card"
                    }`}
                  >
                    {val === "relevance" ? "Relevance" : "Date"}
                    {sortBy === val && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {!hasScan ? (
        <div className="p-8 text-center">
          <div className="relative mx-auto mb-4 h-16 w-16">
            <div className="absolute left-1 top-1 h-12 w-10 space-y-0.5 rounded border border-border bg-card p-1.5">
              <div className="h-1 w-full rounded bg-border/70" />
              <div className="h-1 w-full rounded bg-border/70" />
              <div className="h-1 w-2/3 rounded bg-border/70" />
            </div>
            <div className="absolute -top-1 left-4 h-12 w-10 space-y-0.5 rounded border border-border bg-card p-1.5">
              <div className="mb-1 rounded bg-primary px-1 text-[7px] font-bold text-primary-foreground">
                TOP MATCH
              </div>
              <div className="h-1 w-full rounded bg-primary opacity-40" />
              <div className="h-1 w-full rounded bg-border/70" />
              <div className="h-1 w-2/3 rounded bg-border/70" />
            </div>
            <div className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
              <ArrowRight className="h-3 w-3 text-primary-foreground" />
            </div>
          </div>
          <h3 className="mb-1 text-base font-bold text-foreground">
            Let {BRAND.name} match jobs for you
          </h3>
          <p className="mx-auto mb-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {BRAND.name} matches you with jobs based on your resume and
            experience, not just job titles or keywords like traditional job
            boards. Create a scan to unlock personalized job recommendations.
          </p>
          <button
            type="button"
            onClick={onCreateScan}
            className="cursor-pointer text-sm font-semibold text-foreground hover:underline"
          >
            + Create New Scan
          </button>
        </div>
      ) : (
        <section className="bg-background p-5">
          <div className="mb-4 flex items-start gap-2 text-sm leading-relaxed text-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p>
              Your ATS match rate may be different. {BRAND.name} uses AI for
              smarter matching. Use Scan to spot missing keywords and improve
              your ATS match rate.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {pagedJobs.map((job) => {
              const badgeClass =
                job.badge === "top"
                  ? "bg-primary/10 text-primary"
                  : "bg-green-100 text-green-700";

              const badgeLabel =
                job.badge === "top" ? "Top Match" : "Good Match";

              return (
                <article
                  key={job.id}
                  onClick={() => openJobPreview(job)}
                  className={`group relative rounded-xl border border-border bg-card p-4 ${
                    job.locked ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold ${badgeClass}`}
                  >
                    {job.badge === "top" ? (
                      <Star className="mr-1 h-3 w-3" />
                    ) : (
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                    )}
                    {badgeLabel}
                  </span>

                  <div
                    className={
                      job.locked
                        ? "mt-2 flex-1 blur-[6px] opacity-70 pointer-events-none select-none"
                        : "mt-2 flex-1"
                    }
                  >
                    <h3
                      title={job.title}
                      className="line-clamp-1 text-base font-bold text-primary"
                    >
                      {job.title}
                    </h3>
                    <p
                      title={job.company}
                      className="mt-1 line-clamp-1 text-sm font-semibold text-foreground"
                    >
                      {job.company}
                    </p>
                    <p
                      title={job.location}
                      className="mt-1 line-clamp-1 text-sm text-muted-foreground"
                    >
                      {job.location}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      {formatPosted(job.postedAt)}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-md border border-border px-4 py-1.5 text-sm font-semibold text-foreground hover:border-foreground"
                      >
                        Scan
                      </button>
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className="text-muted-foreground hover:text-foreground"
                        aria-label="Save job"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {job.locked ? (
                    <>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0">
                        <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
                          <Lock className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <div className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-3 py-1.5 text-sm font-semibold text-primary">
                          <Lock className="h-3.5 w-3.5" />
                          Unlock to view
                        </div>
                      </div>
                    </>
                  ) : null}
                </article>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="rounded-md border border-border px-2 py-1 text-muted-foreground disabled:opacity-40"
            >
              {"<"}
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`min-w-8 rounded-md px-2 py-1 ${
                  safeCurrentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={safeCurrentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              className="rounded-md border border-border px-2 py-1 text-muted-foreground disabled:opacity-40"
            >
              {">"}
            </button>
          </div>
        </section>
      )}

      {openDropdown && (
        <button
          type="button"
          aria-label="close dropdown"
          onClick={closeDropdown}
          className="fixed inset-0 z-10 cursor-default"
        />
      )}

      {previewJob && (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close quick JD preview"
            onClick={closeJobPreview}
            className="absolute inset-0 bg-black/30"
          />

          <aside className="absolute inset-y-4 right-0 flex w-[min(620px,calc(100%-2rem))] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
            <header className="border-b border-border px-6 pb-4 pt-5">
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold leading-tight text-foreground">
                    {previewJob.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-foreground">
                    {previewJob.company}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeJobPreview}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {previewJob.location}
                </div>
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" />
                  {previewJob.jobType}
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
                  <Bookmark className="h-3.5 w-3.5" /> Save Job
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Apply
                </button>
              </div>
            </header>

            <div
              className="min-h-0 flex-1 overflow-y-scroll px-6 py-5 text-sm leading-relaxed text-foreground"
              style={{ scrollbarGutter: "stable" }}
            >
              <h4 className="mb-2 font-semibold uppercase tracking-wide text-foreground/90">
                Job Description
              </h4>
              <p className="mb-5">{previewJob.description}</p>

              <h4 className="mb-2 font-semibold">Responsibilities</h4>
              <ul className="mb-5 space-y-1.5">
                {previewJob.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h4 className="mb-2 font-semibold">Requirements</h4>
              <ul className="space-y-1.5">
                {previewJob.requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
