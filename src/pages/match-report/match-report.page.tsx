import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AppShell } from "@/shared/ui/app-shell";
import { getLatestAnalysisId } from "@/shared/config/latest-analysis";
import { useCvAnalysisResult } from "@/features/cv/model/cv.model";

type Status = "ok" | "warn" | "fail";

function statusColor(status: Status) {
  if (status === "ok") return "text-primary";
  if (status === "warn") return "text-amber-500";
  return "text-destructive";
}

function scoreStatus(score: number): Status {
  if (score >= 70) return "ok";
  if (score >= 45) return "warn";
  return "fail";
}

function barColor(score: number) {
  if (score >= 70) return "bg-primary";
  if (score >= 45) return "bg-amber-500";
  return "bg-destructive";
}

function CheckRow({
  label,
  status,
  text,
}: {
  label: string;
  status: Status;
  text: string;
}) {
  return (
    <div className="grid grid-cols-[180px_1fr] gap-3 border-t border-border px-4 py-3 first:border-t-0">
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <p className="text-sm text-muted-foreground">
        <span className={`mr-2 font-semibold ${statusColor(status)}`}>
          {status === "ok" ? "OK" : status === "warn" ? "!" : "X"}
        </span>
        {text}
      </p>
    </div>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-3">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

export function MatchReportPage() {
  const [tab, setTab] = useState<"resume" | "jd">("resume");
  const analysisId = getLatestAnalysisId();
  const { analysis, loading, error } = useCvAnalysisResult(analysisId);

  if (!analysisId) {
    return (
      <AppShell fullWidth>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Match Report</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              No scan result found yet. Run a new scan from the dashboard first.
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (loading) {
    return (
      <AppShell fullWidth>
        <div className="flex min-h-[70vh] items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading your latest analysis...
        </div>
      </AppShell>
    );
  }

  if (error || !analysis) {
    return (
      <AppShell fullWidth>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Match Report</h1>
            <p className="mt-3 text-sm text-destructive">
              We could not load this analysis right now.
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  const breakdown = analysis.jobMatch.scoreBreakdown;
  const sidebarScores = [
    ["Searchability", breakdown.atsReadability ?? 0, "ATS readability"],
    ["Hard Skills", breakdown.skillMatch, `${analysis.jobMatch.missingSkills.length} missing`],
    ["Recruiter Tips", analysis.aiReview ? analysis.aiReview.concerns.length * 25 : 0, "AI review"],
    ["Experience", breakdown.experienceMatch, `${analysis.gapAnalysis.experienceGap.gapWeeks} weeks gap`],
    ["Formatting", breakdown.titleMatch ?? 0, "Title match"],
  ] as const;

  const jobSkillNames = new Set(analysis.jobContext.jobSkills.map((skill) => skill.name));
  const resumeSkillNames = new Set(analysis.extractedProfile.cvSkills.map((skill) => skill.name));
  const allSkillNames = Array.from(new Set([...jobSkillNames, ...resumeSkillNames])).sort();

  return (
    <AppShell fullWidth>
      <div className="space-y-4 pb-12">
        <div className="rounded-lg border border-border bg-card px-4 py-3">
          <p className="text-[11px] text-muted-foreground">
            Resume scan results
          </p>
          <h1 className="text-[15px] font-semibold text-foreground">
            {analysis.jobContext.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[190px_1fr]">
          <aside className="rounded-lg border border-border bg-card p-3 lg:sticky lg:top-20 lg:self-start">
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Match Rate
            </p>
            <div className="mb-3 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-primary/70 text-3xl font-bold text-primary">
                {analysis.jobMatch.score}
                <span className="ml-1 text-xs text-muted-foreground">%</span>
              </div>
            </div>
            <div className="mb-3 rounded-md bg-muted px-2 py-2 text-center text-[11px] font-semibold uppercase text-muted-foreground">
              {analysis.aiReview?.verdict ?? "analysis"}
            </div>
            <div className="space-y-2 text-[11px]">
              {sidebarScores.map(([label, score, note]) => (
                <div key={label}>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-foreground">{label}</span>
                    <span className="truncate text-foreground">{note}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-border">
                    <div
                      className={`h-1.5 rounded-full ${barColor(score)}`}
                      style={{ width: `${Math.min(Math.max(score, 0), 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <main className="space-y-6">
            <div className="flex border-b border-border">
              <button
                onClick={() => setTab("resume")}
                className={`px-6 py-2 text-sm font-medium ${
                  tab === "resume"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Resume Report
              </button>
              <button
                onClick={() => setTab("jd")}
                className={`px-6 py-2 text-sm font-medium ${
                  tab === "jd"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground"
                }`}
              >
                Job Description
              </button>
            </div>

            {tab === "resume" ? (
              <>
                <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-muted px-4 py-2">
                  <p className="text-sm text-muted-foreground">
                    {analysis.aiReview?.summary ??
                      "AI review is not available for this analysis."}
                  </p>
                  <span className="shrink-0 rounded bg-accent px-2 py-1 text-xs font-semibold text-accent-foreground">
                    {analysis.aiReview?.source ?? "AI"}
                  </span>
                </div>

                <section>
                  <SectionTitle
                    title="Searchability"
                    description="Review parsing signals, title matching, location, and ATS readability."
                  />
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <CheckRow
                      label="ATS Readability"
                      status={scoreStatus(breakdown.atsReadability ?? 0)}
                      text={`ATS readability score is ${breakdown.atsReadability ?? 0}/100.`}
                    />
                    <CheckRow
                      label="Job Title Match"
                      status={scoreStatus(breakdown.titleMatch ?? 0)}
                      text={`Title match score is ${breakdown.titleMatch ?? 0}/100 for ${analysis.jobContext.title}.`}
                    />
                    <CheckRow
                      label="Location Match"
                      status={scoreStatus(breakdown.locationMatch)}
                      text={`Preferred locations: ${
                        analysis.extractedProfile.preferredLocations.join(", ") || "-"
                      }. Job location: ${analysis.jobContext.jobLocation ?? "-"}.`}
                    />
                    <CheckRow
                      label="Certifications"
                      status={
                        analysis.gapAnalysis.certificationGap.missing.length
                          ? "fail"
                          : "ok"
                      }
                      text={`Have: ${
                        analysis.gapAnalysis.certificationGap.have.join(", ") || "-"
                      }. Missing: ${
                        analysis.gapAnalysis.certificationGap.missing.join(", ") || "none"
                      }.`}
                    />
                  </div>
                </section>

                <section>
                  <SectionTitle title="Hard skills" />
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="grid grid-cols-3 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <span>Skill</span>
                      <span>Resume</span>
                      <span>Job Description</span>
                    </div>
                    {allSkillNames.map((skill) => (
                      <div
                        key={skill}
                        className="grid grid-cols-3 border-t border-border px-4 py-2 text-sm text-foreground"
                      >
                        <span>{skill}</span>
                        <span className={resumeSkillNames.has(skill) ? "" : "text-destructive"}>
                          {resumeSkillNames.has(skill) ? "found" : "x"}
                        </span>
                        <span>{jobSkillNames.has(skill) ? "required" : "-"}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionTitle title="Recruiter tips" />
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    {(analysis.aiReview?.strengths ?? []).map((item) => (
                      <CheckRow key={item} label="Strength" status="ok" text={item} />
                    ))}
                    {(analysis.aiReview?.concerns ?? []).map((item) => (
                      <CheckRow key={item} label="Concern" status="fail" text={item} />
                    ))}
                    {(analysis.aiReview?.recommendations ?? []).map((item) => (
                      <CheckRow
                        key={item}
                        label="Recommendation"
                        status="warn"
                        text={item}
                      />
                    ))}
                  </div>
                </section>

                <section>
                  <SectionTitle
                    title="Roadmap"
                    description={`Estimated completion: ${analysis.roadmap.estimatedCompletion}. ${analysis.roadmap.totalWeeks} weeks. Difficulty: ${analysis.roadmap.difficultyLevel}.`}
                  />
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    {analysis.roadmap.phases.map((phase) => (
                      <div key={phase.phase} className="border-t border-border px-4 py-3 first:border-t-0">
                        <p className="text-sm font-semibold text-primary">
                          Phase {phase.phase} / {phase.durationWeeks} weeks
                        </p>
                        <div className="mt-2 grid gap-2">
                          {phase.skills.map((skill) => (
                            <div
                              key={`${phase.phase}-${skill.skillName}`}
                              className="grid grid-cols-[180px_1fr] gap-3 text-sm"
                            >
                              <span className="font-semibold text-foreground">
                                {skill.skillName}
                              </span>
                              <span className="text-muted-foreground">
                                {skill.estimatedWeeks} weeks / priority{" "}
                                {skill.priority} / adjusted{" "}
                                {skill.adjustedHours ?? "-"}h
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="rounded-lg border border-border bg-card p-8">
                  <h2 className="mb-4 text-2xl font-bold text-foreground">
                    {analysis.jobContext.title}
                  </h2>
                  <div className="space-y-2 text-sm leading-7 text-foreground">
                    <p>Job ID: {analysis.jobContext.jobId}</p>
                    <p>Level: {analysis.jobContext.jobLevel}</p>
                    <p>
                      Required experience: {analysis.jobContext.jobYearsRequired} years
                    </p>
                    <p>Location: {analysis.jobContext.jobLocation ?? "-"}</p>
                    <p>Remote: {analysis.jobContext.jobIsRemote ? "Yes" : "No"}</p>
                    {analysis.jobContext.sourceUrl ? (
                      <a
                        href={analysis.jobContext.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-primary hover:underline"
                      >
                        View source job
                      </a>
                    ) : null}
                  </div>
                </section>

                <section>
                  <SectionTitle title="Required skills" />
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="grid grid-cols-3 bg-background px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <span>Skill</span>
                      <span>Importance</span>
                      <span>Required proficiency</span>
                    </div>
                    {analysis.jobContext.jobSkills.map((skill) => (
                      <div
                        key={skill.name}
                        className="grid grid-cols-3 border-t border-border px-4 py-2 text-sm text-foreground"
                      >
                        <span>{skill.name}</span>
                        <span>{Math.round(skill.importance * 100)}%</span>
                        <span>{Math.round(skill.requiredProficiency * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <SectionTitle title="Gap analysis" />
                  <div className="overflow-hidden rounded-lg border border-border bg-card">
                    {analysis.gapAnalysis.skillGap.missing.map((item) => (
                      <CheckRow
                        key={`${item.skill}-${item.reason}`}
                        label={item.skill}
                        status="fail"
                        text={`${item.importance}: ${item.reason}`}
                      />
                    ))}
                    {analysis.gapAnalysis.skillGap.weak.map((item) => (
                      <CheckRow
                        key={`${item.skill}-${item.gap}`}
                        label={item.skill}
                        status="warn"
                        text={`Current ${Math.round(
                          item.currentProficiency * 100,
                        )}%, required ${Math.round(
                          item.requiredProficiency * 100,
                        )}%, gap ${Math.round(item.gap * 100)}%.`}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </AppShell>
  );
}
