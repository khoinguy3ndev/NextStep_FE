import { useState } from "react";
import { AppShell } from "@/shared/ui/app-shell";
import { ScanHistorySection } from "@/shared/ui/scan-history-section";
import { getHasScannedCv, setHasScannedCv } from "@/shared/config/scan-status";

export function ScanHistoryPage() {
  const [hasScan, setHasScan] = useState(() => getHasScannedCv());

  return (
    <AppShell fullWidth>
      <ScanHistorySection
        hasScan={hasScan}
        onScanResume={() => {
          setHasScannedCv(true);
          setHasScan(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </AppShell>
  );
}
