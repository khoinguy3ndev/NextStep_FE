import { JobsBrowser } from "@/shared/ui/jobs-browser";

type AiJobMatchSectionProps = {
  hasScan: boolean;
  onCreateScan?: () => void;
};

export function AiJobMatchSection({
  hasScan,
  onCreateScan,
}: AiJobMatchSectionProps) {
  return (
    <JobsBrowser
      hasScan={hasScan}
      title="Find Jobs"
      description="Search live jobs from the backend crawler or switch to resume mode after you complete a scan."
      onCreateScan={onCreateScan}
    />
  );
}
