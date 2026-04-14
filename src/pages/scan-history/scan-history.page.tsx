import { useState } from "react";
import { AppShell } from "@/shared/ui/app-shell";
import { ScanHistorySection } from "@/shared/ui/scan-history-section";

export function ScanHistoryPage() {
  const [hasScan, setHasScan] = useState(true);

  return (
    <AppShell fullWidth>
      <ScanHistorySection
        hasScan={hasScan}
        onScanResume={() => {
          setHasScan(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </AppShell>
  );
}
