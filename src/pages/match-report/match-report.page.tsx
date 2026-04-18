import { Loader2 } from "lucide-react";
import { AppShell } from "@/shared/ui/app-shell";
import { getLatestAnalysisId } from "@/shared/config/latest-analysis";
import { useCvAnalysisResult } from "@/features/cv/model/cv.model";

function ScoreCard({
  label,
  value,
}: {
  label: string;
  value: number | null | undefined;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-foreground">
        {value ?? 0}
      </p>
    </div>
  );
}

export function MatchReportPage() {
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

  return (
    <AppShell fullWidth>
      <div className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm font-semibold text-primary">
            Analysis #{analysis.analysisResultId ?? analysisId}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-foreground">
            {analysis.jobContext.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Target level: {analysis.jobContext.jobLevel} • Required experience:{" "}
            {analysis.jobContext.jobYearsRequired} years
            {analysis.jobContext.jobLocation
              ? ` • ${analysis.jobContext.jobLocation}`
              : ""}
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <ScoreCard label="Overall Score" value={analysis.jobMatch.score} />
          <ScoreCard
            label="Skill Match"
            value={analysis.jobMatch.scoreBreakdown.skillMatch}
          />
          <ScoreCard
            label="Experience Match"
            value={analysis.jobMatch.scoreBreakdown.experienceMatch}
          />
          <ScoreCard
            label="ATS Readability"
            value={analysis.jobMatch.scoreBreakdown.atsReadability}
          />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground">Matched Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.jobMatch.matchedSkills.length > 0 ? (
                analysis.jobMatch.matchedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No matched skills were returned.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground">Missing Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.jobMatch.missingSkills.length > 0 ? (
                analysis.jobMatch.missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No critical missing skills detected.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground">Gap Analysis</h2>
            <div className="mt-4 space-y-4">
              {analysis.gapAnalysis.skillGap.missing.map((item) => (
                <div key={`${item.skill}-${item.reason}`} className="rounded-xl bg-muted p-4">
                  <p className="font-semibold text-foreground">{item.skill}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Priority: {item.importance}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.reason}
                  </p>
                </div>
              ))}
              {analysis.gapAnalysis.skillGap.missing.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No high-priority missing skill groups were found.
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground">Recommended Focus</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {analysis.gapAnalysis.recommendedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-muted p-4 text-sm text-muted-foreground">
              Experience gap: {analysis.gapAnalysis.experienceGap.currentYears} /{" "}
              {analysis.gapAnalysis.experienceGap.requiredYears} years.
              Estimated catch-up window: {analysis.gapAnalysis.experienceGap.gapWeeks} weeks.
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-foreground">Learning Roadmap</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Estimated completion: {analysis.roadmap.estimatedCompletion} •{" "}
                {analysis.roadmap.totalWeeks} weeks • Difficulty:{" "}
                {analysis.roadmap.difficultyLevel}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {analysis.roadmap.phases.map((phase) => (
              <div key={phase.phase} className="rounded-xl bg-muted p-5">
                <p className="text-sm font-semibold text-primary">
                  Phase {phase.phase} • {phase.durationWeeks} weeks
                </p>
                <h3 className="mt-1 text-lg font-bold text-foreground">
                  {phase.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {phase.skills.map((skill) => (
                    <div
                      key={`${phase.phase}-${skill.skillName}`}
                      className="rounded-lg border border-border bg-card p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-foreground">
                          {skill.skillName}
                        </p>
                        <span className="text-xs font-semibold text-muted-foreground">
                          Priority {skill.priority}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Estimated time: {skill.estimatedWeeks} weeks
                      </p>
                      {skill.recommendedResources.length > 0 ? (
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                          {skill.recommendedResources.map((resource) => (
                            <li key={`${skill.skillName}-${resource.title}`}>
                              {resource.title}
                              {resource.provider ? ` • ${resource.provider}` : ""}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
