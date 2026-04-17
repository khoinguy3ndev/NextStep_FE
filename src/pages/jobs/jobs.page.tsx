import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/shared/ui/app-shell";
import { JobsBrowser } from "@/shared/ui/jobs-browser";
import { getHasScannedCv } from "@/shared/config/scan-status";

export function JobsPage() {
  const navigate = useNavigate();
  const [hasScan] = useState(() => getHasScannedCv());

  return (
    <AppShell fullWidth>
      <JobsBrowser
        hasScan={hasScan}
        title="Find Jobs"
        description="Browse live jobs from the backend crawler, or switch to resume mode after scanning your CV."
        onCreateScan={() => navigate({ to: "/dashboard" })}
      />
    </AppShell>
  );
}
