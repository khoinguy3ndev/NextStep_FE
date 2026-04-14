import { useEffect, useMemo, useRef, useState } from "react";
import {
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
} from "lucide-react";
import { AppShell } from "@/shared/ui/app-shell";
import { FilterSelect } from "@/shared/ui/filter-select";
import { BRAND } from "@/shared/config/brand";
import { mockJobs, type MockJob } from "@/shared/config/mock-jobs";

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

const JOB_TYPE_OPTIONS: Array<{ value: JobTypeFilter; label: string }> = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Temporary", label: "Temporary" },
  { value: "Volunteer", label: "Volunteer" },
];

const REMOTE_OPTIONS: Array<{ value: RemoteFilter; label: string }> = [
  { value: "on-site", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "remote", label: "Remote" },
];

const jobs: MockJob[] = mockJobs;
const getJobId = (job: MockJob) => job.id;
const getDefaultJobId = (jobList: MockJob[]) =>
  jobList.find((job) => !job.locked)?.id ?? jobList[0]?.id ?? "";

const getPostedDays = (postedAt: string) => {
  const posted = new Date(postedAt).getTime();
  if (Number.isNaN(posted)) return Number.MAX_SAFE_INTEGER;
  const diffMs = Date.now() - posted;
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
};

const formatPosted = (postedAt: string) => {
  const days = getPostedDays(postedAt);
  if (days <= 1) return "1 day ago";
  return `${days} days ago`;
};

type JobsUrlFilters = {
  searchMode: "resume" | "keyword";
  sortBy: SortBy;
  dateRange: DateRangeFilter;
  jobTypeFilter: JobTypeFilter;
  remoteFilter: RemoteFilter;
  keyword: string;
  location: string;
};

function readJobsFiltersFromUrl(): JobsUrlFilters {
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
    jobTypeFilter: (JOB_TYPE_OPTIONS.some((item) => item.value === type)
      ? type
      : "all") as JobTypeFilter,
    remoteFilter: (REMOTE_OPTIONS.some((item) => item.value === remote)
      ? remote
      : "all") as RemoteFilter,
    keyword: params.get("q") ?? "",
    location: params.get("loc") ?? "",
  };
}

export function JobsPage() {
  const [selectedJobId, setSelectedJobId] = useState(getDefaultJobId(jobs));
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null);
  const [searchMode, setSearchMode] = useState<"resume" | "keyword">(
    () => readJobsFiltersFromUrl().searchMode,
  );
  const [sortBy, setSortBy] = useState<SortBy>(
    () => readJobsFiltersFromUrl().sortBy,
  );
  const [dateRange, setDateRange] = useState<DateRangeFilter>(
    () => readJobsFiltersFromUrl().dateRange,
  );
  const [jobTypeFilter, setJobTypeFilter] = useState<JobTypeFilter>(
    () => readJobsFiltersFromUrl().jobTypeFilter,
  );
  const [remoteFilter, setRemoteFilter] = useState<RemoteFilter>(
    () => readJobsFiltersFromUrl().remoteFilter,
  );
  const [keyword, setKeyword] = useState(
    () => readJobsFiltersFromUrl().keyword,
  );
  const [location, setLocation] = useState(
    () => readJobsFiltersFromUrl().location,
  );
  const [leftPanelHeight, setLeftPanelHeight] = useState<number | null>(null);
  const rightPanelRef = useRef<HTMLElement | null>(null);

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

  const selectedJob = useMemo(() => {
    const selectedVisible = visibleJobs.find(
      (job) => getJobId(job) === selectedJobId,
    );

    if (selectedVisible && !selectedVisible.locked) {
      return selectedVisible;
    }

    return (
      visibleJobs.find((job) => !job.locked) ??
      visibleJobs[0] ??
      jobs.find((job) => !job.locked) ??
      jobs[0]
    );
  }, [selectedJobId, visibleJobs]);

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

  useEffect(() => {
    const syncPanelHeight = () => {
      if (!rightPanelRef.current) return;
      setLeftPanelHeight(Math.ceil(rightPanelRef.current.offsetHeight));
    };

    syncPanelHeight();

    const observer = new ResizeObserver(syncPanelHeight);
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
            <FilterSelect
              label={
                DATE_RANGE_OPTIONS.find((item) => item.value === dateRange)
                  ?.label ?? "Date range"
              }
              isOpen={openDropdown === "date"}
              onToggle={() => toggleDropdown("date")}
              onClose={closeDropdown}
              options={DATE_RANGE_OPTIONS}
              onSelect={setDateRange}
              selectedValue={dateRange}
              menuWidthClass="w-36"
            />

            <FilterSelect
              label={jobTypeFilter === "all" ? "Job type" : jobTypeFilter}
              isOpen={openDropdown === "type"}
              onToggle={() => toggleDropdown("type")}
              onClose={closeDropdown}
              options={JOB_TYPE_OPTIONS}
              onSelect={setJobTypeFilter}
              selectedValue={
                jobTypeFilter === "all" ? undefined : jobTypeFilter
              }
              menuWidthClass="w-36"
            />

            <FilterSelect
              label={
                REMOTE_OPTIONS.find((item) => item.value === remoteFilter)
                  ?.label ?? "Remote option"
              }
              isOpen={openDropdown === "remote"}
              onToggle={() => toggleDropdown("remote")}
              onClose={closeDropdown}
              options={REMOTE_OPTIONS}
              onSelect={setRemoteFilter}
              selectedValue={remoteFilter === "all" ? undefined : remoteFilter}
              menuWidthClass="w-32"
            />

            <button
              type="button"
              onClick={() => {
                setKeyword("");
                setLocation("");
                setDateRange("any");
                setJobTypeFilter("all");
                setRemoteFilter("all");
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
              Your ATS match rate may be different. {BRAND.name} uses AI for
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
                    {(["relevance", "date"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setSortBy(value);
                          closeDropdown();
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-foreground hover:bg-muted ${
                          sortBy === value
                            ? "bg-accent text-accent-foreground"
                            : "bg-card"
                        }`}
                      >
                        {value === "relevance" ? "Relevance" : "Date"}
                        {sortBy === value && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-3">
                {visibleJobs.map((job) => {
                  const jobId = getJobId(job);
                  const isActive = getJobId(selectedJob) === jobId;

                  return (
                    <button
                      key={jobId}
                      type="button"
                      onClick={() => {
                        if (job.locked) return;
                        setSelectedJobId(jobId);
                      }}
                      className={`group relative mb-2 w-full rounded-xl border p-4 text-left transition-colors ${
                        isActive
                          ? "border-primary/40 bg-accent"
                          : "border-border bg-card hover:bg-background"
                      }`}
                    >
                      {(job.badge === "top" || job.badge === "good") && (
                        <span
                          className={`mb-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                            job.badge === "top"
                              ? "border border-primary/30 bg-primary/15 text-primary"
                              : "border border-green-200 bg-green-100 text-green-700"
                          }`}
                        >
                          {job.badge === "top" ? (
                            <Star className="h-3 w-3" />
                          ) : (
                            <CheckCircle2 className="h-3 w-3" />
                          )}
                          {job.badge === "top" ? "Top Match" : "Good Match"}
                        </span>
                      )}

                      <div
                        className={
                          job.locked
                            ? "blur-[4px] opacity-70 select-none"
                            : undefined
                        }
                      >
                        <div className="line-clamp-1 text-base font-bold text-primary">
                          {job.title}
                        </div>
                        <div className="mt-1 line-clamp-1 text-sm font-semibold text-foreground">
                          {job.company}
                        </div>
                        <div className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                          {job.location}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {formatPosted(job.postedAt)}
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
                    {selectedJob.jobType}
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
