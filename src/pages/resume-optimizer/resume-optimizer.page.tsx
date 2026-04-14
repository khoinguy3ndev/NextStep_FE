import { Sparkles } from "lucide-react";
import { AppShell } from "@/shared/ui/app-shell";
import { NewScanSection } from "@/shared/ui/new-scan-section";

export function ResumeOptimizerPage() {
  return (
    <AppShell fullWidth>
      <div className="space-y-5">
        <NewScanSection />

        <button className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-lg transition-colors hover:border-foreground hover:text-foreground">
          <Sparkles className="h-4 w-4" />
          One-Click Optimize
        </button>
      </div>
    </AppShell>
  );
}
