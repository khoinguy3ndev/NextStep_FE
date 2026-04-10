import { useState } from "react";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { AppShell } from "@/shared/ui/app-shell";
import { UploadCvWidget } from "@/widgets/cv";

export function ResumeOptimizerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [showPromo, setShowPromo] = useState(true);

  const canScan = resumeText.trim().length > 0 && jdText.trim().length > 0;

  return (
    <AppShell fullWidth>
      <div className="space-y-5 pb-24">
        <section className="text-center">
          <h1 className="text-2xl font-bold text-foreground">
            One-Click Optimize
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Smarter, simpler, faster resume tailoring.
          </p>
        </section>

        {showPromo ? (
          <div className="relative flex gap-4 rounded-xl border border-border bg-muted p-4">
            <div className="flex h-[82px] w-[92px] flex-shrink-0 flex-col rounded-md border border-border bg-card p-2 text-[7px]">
              <div className="mb-1 h-1 w-[56%] rounded bg-primary opacity-60" />
              <div className="mb-1 h-1 rounded bg-border/70" />
              <div className="mb-1 h-1 w-[42%] rounded bg-border/70" />
              <div className="mb-2 h-1 w-[80%] rounded bg-border/70" />
              <div className="rounded border border-border bg-background p-1 text-muted-foreground">
                <p className="mb-0.5 font-semibold text-foreground">
                  AI suggested missing skill
                </p>
                <p>Compelling cohesive designs</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-block rounded bg-foreground px-2 py-0.5 text-[10px] font-bold tracking-wider text-background">
                NEW
              </div>
              <h3 className="mb-1 text-base font-bold text-foreground">
                One-Click Optimize your resume
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Smarter, simpler, faster resume tailoring. All with the peace of
                mind that comes from knowing that your original content is
                preserved and you have full control.
              </p>
              <a
                href="#"
                className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:underline"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Try It Now
              </a>
            </div>

            <button
              type="button"
              onClick={() => setShowPromo(false)}
              className="absolute right-3 top-3 text-xl leading-none text-muted-foreground hover:text-foreground"
              aria-label="Dismiss promo"
            >
              ×
            </button>
          </div>
        ) : null}

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold text-foreground">New scan</h2>

          <div className="mb-6 grid grid-cols-2 gap-5">
            <UploadCvWidget
              value={resumeText}
              onValueChange={setResumeText}
              headerAction={
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Star className="h-4 w-4" />
                  Saved Resumes
                </a>
              }
            />

            <div className="flex flex-col overflow-hidden rounded-xl border border-border">
              <div className="flex items-center border-b border-border bg-background p-4">
                <label className="text-sm font-semibold text-foreground">
                  Step 2: Paste a job description
                </label>
              </div>
              <div className="flex flex-1 flex-col bg-background/50 p-4">
                <textarea
                  value={jdText}
                  onChange={(event) => setJdText(event.target.value)}
                  placeholder="Copy and paste job description here. Aim to exclude: Benefits, Perks, and Legal Disclaimers"
                  className="min-h-[180px] w-full flex-1 resize-none bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              View sample Scan
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5">
                <span className="text-sm text-muted-foreground">
                  Available scans:{" "}
                  <span className="font-bold text-foreground">5</span>
                </span>
                <a
                  href="#"
                  className="text-sm font-semibold text-foreground hover:underline"
                >
                  Upgrade
                </a>
              </div>

              <button className="flex cursor-not-allowed items-center gap-1.5 rounded-md bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                One-Click Optimize
              </button>

              <button
                type="button"
                disabled={!canScan}
                className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
              >
                Scan
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
          <div className="flex flex-col rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-foreground">
                Latest Resume Scan
              </h3>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Sparkles className="h-5 w-5 text-foreground" />
              </div>
              <p className="mb-3 text-sm text-muted-foreground">
                Scan your resume to start optimizing it for a new job
                opportunity.
              </p>
              <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                Scan Resume
              </button>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-foreground" />
                <h3 className="text-base font-bold text-foreground">
                  Job Tracker
                </h3>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mb-3 text-xs text-muted-foreground">Next Interview</p>
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                <Star className="h-5 w-5 text-muted-foreground/60" />
              </div>
              <p className="text-sm text-muted-foreground/60">
                No upcoming interview
              </p>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-4 w-4 items-center justify-center rounded bg-foreground">
                  <Sparkles className="h-3 w-3 text-background" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  LinkedIn Report
                </h3>
              </div>
            </div>
            <p className="mb-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              Optimize your LinkedIn profile to match your preferred job
              listings.
            </p>
            <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
              Optimize LinkedIn
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="text-base font-bold text-foreground">
                AI Job Match
              </h2>
            </div>
            <a href="#" className="text-sm text-foreground hover:underline">
              View all ?
            </a>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Get personalized skills and qualifications, and let NextStepAI match
            your best-fit jobs.
          </p>

          <div className="flex gap-2">
            <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground">
              Date range
            </button>
            <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground">
              Job type
            </button>
            <button className="rounded-lg border border-border bg-card px-3 py-2 text-sm text-muted-foreground hover:border-foreground hover:text-foreground">
              Remote option
            </button>
            <button className="ml-auto text-sm text-muted-foreground hover:text-foreground">
              Clear all
            </button>
          </div>
        </div>

        <button className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-lg transition-colors hover:border-foreground hover:text-foreground">
          <Sparkles className="h-4 w-4" />
          One-Click Optimize
        </button>
      </div>
    </AppShell>
  );
}
