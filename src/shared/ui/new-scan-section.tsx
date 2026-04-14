import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CloudUpload, Loader2, Sparkles, Star } from "lucide-react";
import { useUploadCv } from "@/features/cv/model/cv.model";

export function NewScanSection() {
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
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h2 className="text-[22px] font-bold text-foreground mb-5">New scan</h2>

      <div className="grid grid-cols-2 gap-5 mb-6">
        <div className="border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-4 bg-background border-b border-border">
            <label className="text-sm font-semibold text-foreground">
              Step 1: Upload a resume
            </label>
            <a
              href="#"
              className="text-sm text-muted-foreground flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Star className="w-4 h-4" />
              Saved Resumes
            </a>
          </div>
          <div className="p-4 flex-1 flex flex-col gap-4 bg-background/50">
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Copy and paste resume here."
              className="w-full flex-1 min-h-[180px] bg-transparent text-sm text-muted-foreground resize-none outline-none placeholder:text-muted-foreground"
            />
            <label className="flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground bg-card cursor-pointer hover:border-primary hover:text-primary transition-colors shadow-sm">
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

        <div className="border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="flex items-center p-4 bg-background border-b border-border">
            <label className="text-sm font-semibold text-foreground">
              Step 2: Paste a job description
            </label>
          </div>
          <div className="p-4 flex-1 flex flex-col bg-background/50">
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Copy and paste job description here. Aim to exclude: Benefits, Perks, and Legal Disclaimers"
              className="w-full flex-1 min-h-[180px] bg-transparent text-sm text-muted-foreground resize-none outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => navigate({ to: "/sample-report" })}
        >
          View sample Scan
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-accent border border-primary/20 rounded-md px-3 py-1.5 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Available scans:{" "}
              <span className="font-bold text-accent-foreground">5</span>
            </span>
            <a
              href="#"
              className="text-primary font-semibold text-sm hover:underline"
            >
              Upgrade
            </a>
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-muted text-muted-foreground rounded-md text-sm font-semibold cursor-not-allowed">
            <Sparkles className="w-4 h-4" />
            One-Click Optimize
          </button>

          <button
            disabled={!canScan}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            Scan
          </button>
        </div>
      </div>
    </div>
  );
}
