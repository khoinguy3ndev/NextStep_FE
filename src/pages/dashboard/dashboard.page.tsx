import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Sparkles,
  FileText,
  Users,
  Calendar,
  Search,
  MapPin,
  Star,
  Loader2,
  CloudUpload,
  ArrowRight,
} from "lucide-react";
import { BRAND } from "@/shared/config/brand";
import { AppShell } from "@/shared/ui/app-shell";
import { useUploadCv } from "@/features/cv/model/cv.model";

export function DashboardPage() {
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

  const canScan = resumeText.trim() && jdText.trim();

  return (
    <AppShell fullWidth>
      <div className="space-y-5">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-5">New scan</h2>

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

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-base font-bold text-foreground">
                AI Job Match
              </h2>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Get personalized skills and qualifications, and let {BRAND.name}{" "}
            match your best-fit jobs.
          </p>

          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full pl-8 pr-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-foreground transition-colors"
              />
            </div>
            <div className="w-52 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Your current location"
                className="w-full pl-8 pr-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-foreground transition-colors"
              />
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <button className="px-3 py-1.5 border border-border rounded-lg text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <span>Date range</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button className="px-3 py-1.5 border border-border rounded-lg text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <span>Job type</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button className="px-3 py-1.5 border border-border rounded-lg text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
              <span>Remote option</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <span className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
              Clear all
            </span>
            <span className="ml-auto text-sm text-muted-foreground cursor-pointer hover:text-foreground flex items-center gap-1">
              <span>Relevance</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>

          <div className="text-center p-8 bg-muted border border-dashed border-border rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute top-1 left-1 w-10 h-12 bg-card border border-border rounded p-1.5 space-y-0.5">
                <div className="h-1 bg-border/70 rounded w-full"></div>
                <div className="h-1 bg-border/70 rounded w-full"></div>
                <div className="h-1 bg-border/70 rounded w-2/3"></div>
              </div>
              <div className="absolute -top-1 left-4 w-10 h-12 bg-card border border-border rounded p-1.5 space-y-0.5">
                <div className="text-[7px] bg-primary text-primary-foreground font-bold px-1 rounded mb-1">
                  TOP MATCH
                </div>
                <div className="h-1 bg-primary rounded w-full opacity-40"></div>
                <div className="h-1 bg-border/70 rounded w-full"></div>
                <div className="h-1 bg-border/70 rounded w-2/3"></div>
              </div>
              <div className="absolute -top-2 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">
              Let {BRAND.name} match jobs for you
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto mb-3">
              {BRAND.name} matches you with jobs based on your resume and
              experience, not just job titles or keywords like traditional job
              boards. Create a scan to unlock personalized job recommendations.
            </p>
            <button className="text-foreground text-sm font-semibold cursor-pointer">
              + Create New Scan
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
