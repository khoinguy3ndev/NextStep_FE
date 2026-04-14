import { useState } from "react";
import { AppShell } from "@/shared/ui/app-shell";
import { NewScanSection } from "@/shared/ui/new-scan-section";
import { AiJobMatchSection } from "@/shared/ui/ai-job-match-section";
import { ScanHistorySection } from "@/shared/ui/scan-history-section";

export function DashboardPage() {
  const [hasScan, setHasScan] = useState(false);

  return (
    <AppShell fullWidth>
      <div className="space-y-5">
        <NewScanSection
          onScan={() => {
            setHasScan(true);
          }}
        />

        <AiJobMatchSection
          hasScan={hasScan}
          onCreateScan={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        <ScanHistorySection
          hasScan={hasScan}
          onScanResume={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </AppShell>
  );
}
