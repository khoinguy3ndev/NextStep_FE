import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CloudUpload, Loader2, Sparkles, Star } from "lucide-react";
import { useUploadCv } from "@/features/cv/model/cv.model";

type NewScanSectionProps = {
  onScan?: () => void;
};

export function NewScanSection({ onScan }: NewScanSectionProps) {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");

  const { uploadCv, isUploading } = useUploadCv();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadCv(file);
      alert(`Upload successful: ${result.fileName}`);
    } catch (err) {
      alert("Upload failed, please try again.");
    }
  };

  const canScan = resumeText.trim().length > 0 && jdText.trim().length > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <section className="border-b border-border bg-muted p-5 pb-4">
        <h2 className="text-[22px] font-bold text-foreground">New Scan</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload your resume and add a job description to generate a focused AI
          scan.
        </p>
      </section>

      <section className="bg-background p-5">
        <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="flex flex-col overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-between border-b border-border bg-card p-4">
              <label className="text-sm font-semibold text-foreground">
                Step 1: Upload a resume
              </label>
              <a
                href="#"
                className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Star className="w-4 h-4" />
                Saved Resumes
              </a>
            </div>
            <div className="flex flex-1 flex-col gap-4 bg-background/50 p-4">
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Copy and paste resume here."
                className="min-h-[180px] w-full flex-1 resize-none bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground"
              />
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card py-2.5 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary">
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-foreground" />
                ) : (
                  <CloudUpload className="w-4 h-4" />
                )}
                {isUploading
                  ? "Processing..."
                  : "Drag & Drop or Upload Your Resume"}{" "}
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={isUploading}
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl border border-border">
            <div className="flex items-center border-b border-border bg-card p-4">
              <label className="text-sm font-semibold text-foreground">
                Step 2: Paste a job description
              </label>
            </div>
            <div className="flex flex-1 flex-col bg-background/50 p-4">
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Copy and paste job description here. Aim to exclude: Benefits, Perks, and Legal Disclaimers"
                className="min-h-[180px] w-full flex-1 resize-none bg-transparent text-sm text-muted-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/sample-report" })}
            className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            View sample report
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-md border border-primary/20 bg-accent px-3 py-1.5">
              <span className="text-sm text-muted-foreground">
                Available scans:{" "}
                <span className="font-bold text-accent-foreground">5</span>
              </span>
              <a
                href="#"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Upgrade
              </a>
            </div>

            <button className="flex cursor-not-allowed items-center gap-1.5 rounded-md bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground">
              <Sparkles className="w-4 h-4" />
              One-Click Optimize
            </button>

            <button
              disabled={!canScan}
              onClick={() => {
                if (!canScan) return;
                onScan?.();
              }}
              className="cursor-pointer rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              Scan
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
