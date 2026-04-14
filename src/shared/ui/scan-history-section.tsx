import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
} from "lucide-react";

export type ScanHistoryItem = {
  id: string;
  score: number;
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  scanDate: string;
};

type ScanHistorySectionProps = {
  hasScan: boolean;
  onScanResume?: () => void;
  items?: ScanHistoryItem[];
};

type SortBy = "scanDate" | "score";
type SortOrder = "desc" | "asc";

const DEFAULT_SCAN_HISTORY: ScanHistoryItem[] = [
  {
    id: "scan-1",
    score: 25,
    companyName: "Google LLC",
    jobTitle: "Full Stack Developer",
    jobDescription:
      "We are looking for a highly skilled computer programmer who is comfortable with both front and back development.",
    scanDate: "Apr 12, 2026",
  },
  {
    id: "scan-2",
    score: 35,
    companyName: "International Business Consulting",
    jobTitle: "Backend Engineer",
    jobDescription:
      "Job Title: Backend Engineer. We are seeking a Backend Engineer to join our team and build reliable services.",
    scanDate: "Apr 1, 2026",
  },
];

function ScoreRing({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));

  return (
    <div
      className="relative h-10 w-10 rounded-full"
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${clamped}%, hsl(var(--border)) ${clamped}% 100%)`,
      }}
    >
      <div className="absolute inset-[3px] flex items-center justify-center rounded-full bg-card text-base font-bold text-foreground">
        {clamped}
      </div>
    </div>
  );
}

function parseScanDate(scanDate: string) {
  const parsed = new Date(scanDate).getTime();
  if (Number.isNaN(parsed)) return 0;
  return parsed;
}

export function ScanHistorySection({
  hasScan,
  onScanResume,
  items = DEFAULT_SCAN_HISTORY,
}: ScanHistorySectionProps) {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("scanDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  const hasHistory = hasScan && items.length > 0;

  const filteredAndSortedItems = useMemo(() => {
    const normalizedQuery = searchValue.trim().toLowerCase();

    let nextItems = items.filter((item) => {
      if (!normalizedQuery) return true;

      return (
        item.companyName.toLowerCase().includes(normalizedQuery) ||
        item.jobTitle.toLowerCase().includes(normalizedQuery) ||
        item.jobDescription.toLowerCase().includes(normalizedQuery)
      );
    });

    nextItems = [...nextItems].sort((a, b) => {
      if (sortBy === "score") {
        return sortOrder === "desc" ? b.score - a.score : a.score - b.score;
      }

      const aDate = parseScanDate(a.scanDate);
      const bDate = parseScanDate(b.scanDate);
      return sortOrder === "desc" ? bDate - aDate : aDate - bDate;
    });

    return nextItems;
  }, [items, searchValue, sortBy, sortOrder]);

  const totalItems = filteredAndSortedItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const pagedItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return filteredAndSortedItems.slice(start, start + pageSize);
  }, [filteredAndSortedItems, safeCurrentPage]);

  const fromItem = totalItems === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const toItem =
    totalItems === 0 ? 0 : Math.min(totalItems, safeCurrentPage * pageSize);

  const orderPrimaryLabel =
    sortBy === "scanDate" ? "Newest First" : "Highest First";
  const orderSecondaryLabel =
    sortBy === "scanDate" ? "Oldest First" : "Lowest First";

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <section className="border-b border-border bg-muted p-5 pb-4">
        <h2 className="text-[22px] font-bold text-foreground">Scan History</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Review your past resume scans and revisit job-fit insights anytime.
        </p>
      </section>

      <section className="bg-background p-5">
        {!hasHistory ? (
          <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                Scan your resume to start optimizing it for a new job
                opportunity.
              </p>
              <button
                type="button"
                onClick={onScanResume}
                className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Scan Resume
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="relative w-full max-w-[260px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search"
                  className="h-10 w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-foreground"
                />
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSortMenuOpen((prev) => !prev)}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground hover:bg-muted"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Sort
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                {isSortMenuOpen && (
                  <div className="absolute right-0 top-11 z-20 w-56 overflow-hidden rounded-lg border border-border bg-card shadow-lg">
                    <div className="px-4 py-2 text-sm text-muted-foreground">
                      Sort by
                    </div>

                    {(
                      [
                        { value: "score", label: "Score" },
                        { value: "scanDate", label: "Scan Date" },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setSortBy(option.value);
                          setCurrentPage(1);
                          setIsSortMenuOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-muted ${
                          sortBy === option.value
                            ? "bg-accent text-accent-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {option.label}
                        {sortBy === option.value ? (
                          <Check className="h-4 w-4" />
                        ) : null}
                      </button>
                    ))}

                    <div className="border-t border-border px-4 py-2 text-sm text-muted-foreground">
                      Order
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSortOrder("desc");
                        setCurrentPage(1);
                        setIsSortMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-muted ${
                        sortOrder === "desc"
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {orderPrimaryLabel}
                      {sortOrder === "desc" ? (
                        <Check className="h-4 w-4" />
                      ) : null}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSortOrder("asc");
                        setCurrentPage(1);
                        setIsSortMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-muted ${
                        sortOrder === "asc"
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {orderSecondaryLabel}
                      {sortOrder === "asc" ? (
                        <Check className="h-4 w-4" />
                      ) : null}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isSortMenuOpen && (
              <button
                type="button"
                aria-label="Close sort menu"
                onClick={() => setIsSortMenuOpen(false)}
                className="fixed inset-0 z-10 cursor-default"
              />
            )}

            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px] table-fixed">
                  <thead>
                    <tr className="border-b border-border bg-card text-left text-sm font-semibold text-foreground">
                      <th className="w-[92px] px-5 py-3">Score</th>
                      <th className="w-[280px] px-4 py-3">
                        Company name / Job title
                      </th>
                      <th className="px-4 py-3">Job description</th>
                      <th className="w-[160px] px-4 py-3">Scan date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedItems.length > 0 ? (
                      pagedItems.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-border last:border-b-0 hover:bg-muted/40"
                        >
                          <td className="px-5 py-4 align-top">
                            <ScoreRing score={item.score} />
                          </td>
                          <td className="px-4 py-4 align-top">
                            <p className="line-clamp-1 text-sm font-semibold text-foreground">
                              {item.companyName}
                            </p>
                            <p className="line-clamp-2 text-sm font-semibold text-primary">
                              {item.jobTitle}
                            </p>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {item.jobDescription}
                            </p>
                          </td>
                          <td className="px-4 py-4 align-top text-sm text-muted-foreground">
                            {item.scanDate}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-10 text-center">
                          <div className="mx-auto max-w-sm">
                            <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                              <Search className="h-5 w-5" />
                            </div>
                            <p className="text-base font-semibold text-foreground">
                              No scan history found
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Try a different keyword or clear search to see all
                              records.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setSearchValue("");
                                setCurrentPage(1);
                              }}
                              className="mt-4 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                            >
                              Clear search
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-muted-foreground">
                Showing {fromItem}-{toItem} of {totalItems}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={safeCurrentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-muted-foreground">
                  {safeCurrentPage}/{totalPages}
                </span>
                <button
                  type="button"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
