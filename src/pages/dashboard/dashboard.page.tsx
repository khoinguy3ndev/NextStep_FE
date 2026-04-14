import { useState } from "react";
import { FileText, Users, Calendar, ArrowRight } from "lucide-react";
import { AppShell } from "@/shared/ui/app-shell";
import { AiJobMatchSection } from "../../shared/ui/ai-job-match-section";
import { NewScanSection } from "@/shared/ui/new-scan-section";

export function DashboardPage() {
  const [hasScan, setHasScan] = useState(true);

  return (
    <AppShell fullWidth>
      <div className="space-y-5">
        <NewScanSection
          onScan={() => {
            setHasScan(true);
          }}
        />

        <div className="grid grid-cols-3 gap-3.5">
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">
                Latest Resume Scan
              </h3>
              <a href="#" className="text-primary text-sm">
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Scan your resume to start optimizing it for a new job
                opportunity.
              </p>
              <button className="border border-border text-foreground bg-card rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-muted transition-colors">
                Scan Resume
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <h3 className="text-base font-bold text-foreground">
                  Job Tracker
                </h3>
              </div>
              <a href="#" className="text-primary text-sm">
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Next Interview</p>
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5 text-muted-foreground/60" />
              </div>
              <p className="text-sm text-muted-foreground/60">
                No upcoming interview
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded flex items-center justify-center">
                  <Users className="w-3 h-3 text-primary-foreground" />
                </div>
                <h3 className="text-base font-bold text-foreground">
                  LinkedIn Report
                </h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">
              Optimize your LinkedIn profile to match your preferred job
              listings.
            </p>
            <button className="border border-border text-foreground bg-card rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-muted transition-colors">
              Optimize LinkedIn
            </button>
          </div>
        </div>

        <AiJobMatchSection
          hasScan={hasScan}
          onCreateScan={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </AppShell>
  );
}
