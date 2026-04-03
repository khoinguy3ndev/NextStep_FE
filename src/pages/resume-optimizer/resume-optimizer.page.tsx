import { useState } from "react";
import { Sparkles, Star } from "lucide-react";
import { AppShell } from "@/shared/ui/app-shell";
import { UploadCvWidget } from "@/widgets/cv";

export function ResumeOptimizerPage() {
  const [resumeText, setResumeText] = useState("");
  const [showPromo, setShowPromo] = useState(true);
  const [jdText, setJdText] = useState("");

  const canScan = resumeText.trim().length > 0 && jdText.trim().length > 0;

  return (
    <AppShell>
      <div className="space-y-5 pb-24">
        <section className="text-center">
          <h1 className="text-2xl font-bold text-[#0f172a]">
            One-Click Optimize
          </h1>
          <p className="text-sm text-[#8892a4] mt-1">
            Smarter, simpler, faster resume tailoring.
          </p>
        </section>

        {showPromo && (
          <div className="bg-[#f0f6ff] border border-[#c7d4f8] rounded-xl p-4 flex gap-4 relative">
            <div className="w-[92px] h-[82px] bg-white rounded-md border border-[#d0d8f0] p-2 flex-shrink-0 text-[7px]">
              <div className="h-1 rounded bg-[#0041c8] w-[56%] opacity-60 mb-1" />
              <div className="h-1 rounded bg-[#dde3f5] mb-1" />
              <div className="h-1 rounded bg-[#dde3f5] w-[42%] mb-1" />
              <div className="h-1 rounded bg-[#dde3f5] w-[80%] mb-2" />
              <div className="border border-[#c7d4f8] bg-[#f0f4ff] rounded p-1 text-[#4a5068]">
                <p className="text-[#0041c8] font-semibold mb-0.5">
                  AI suggested missing skill
                </p>
                <p>Compelling cohesive designs</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-block bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1 tracking-wider">
                NEW
              </div>
              <h3 className="text-base font-bold text-[#0f172a] mb-1">
                One-Click Optimize your resume
              </h3>
              <p className="text-sm text-[#4a5068] leading-relaxed">
                Smarter, simpler, faster resume tailoring. All with the peace of
                mind that comes from knowing that your original content is
                preserved and you have full control.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-[#0041c8] font-semibold text-sm mt-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Try It Now
              </a>
            </div>

            <button
              onClick={() => setShowPromo(false)}
              className="absolute right-3 top-3 text-[#8892a4] hover:text-[#0f172a] text-xl leading-none"
            >
              ×
            </button>
          </div>
        )}

        <div className="bg-white border border-[#e8eaf0] rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#0f172a] mb-5">New scan</h2>

          <div className="grid grid-cols-2 gap-5 mb-6">
            <UploadCvWidget
              value={resumeText}
              onValueChange={setResumeText}
              headerAction={
                <a
                  href="#"
                  className="text-sm text-[#4a5068] flex items-center gap-1.5 hover:text-[#0041c8] transition-colors"
                >
                  <Star className="w-4 h-4" />
                  Saved Resumes
                </a>
              }
            />

            <div className="border border-[#e8eaf0] rounded-xl overflow-hidden flex flex-col">
              <div className="flex items-center p-4 bg-[#f8fafc] border-b border-[#e8eaf0]">
                <label className="text-sm font-semibold text-[#0f172a]">
                  Step 2: Paste a job description
                </label>
              </div>
              <div className="p-4 flex-1 flex flex-col bg-[#f8fafc]/50">
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Copy and paste job description here. Aim to exclude: Benefits, Perks, and Legal Disclaimers"
                  className="w-full flex-1 min-h-[180px] bg-transparent text-sm text-[#4a5068] resize-none outline-none placeholder:text-[#94a3b8]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button className="text-sm font-medium text-[#4a5068] hover:text-[#0041c8] transition-colors">
              View sample Scan
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-md px-3 py-1.5 flex items-center gap-2">
                <span className="text-sm text-[#4a5068]">
                  Available scans:{" "}
                  <span className="font-bold text-[#0f172a]">5</span>
                </span>
                <a
                  href="#"
                  className="text-[#0041c8] font-semibold text-sm hover:underline"
                >
                  Upgrade
                </a>
              </div>

              <button className="flex items-center gap-1.5 px-4 py-2 bg-[#f1f5f9] text-[#94a3b8] rounded-md text-sm font-semibold cursor-not-allowed">
                <Sparkles className="w-4 h-4" />
                One-Click Optimize
              </button>

              <button
                disabled={!canScan}
                className="px-6 py-2 bg-[#0041c8] text-white rounded-md text-sm font-semibold hover:bg-[#002d8a] disabled:bg-[#f1f5f9] disabled:text-[#94a3b8] cursor-pointer disabled:cursor-not-allowed transition-colors"
              >
                Scan
              </button>
            </div>
          </div>
        </div>

        <button className="fixed bottom-6 right-6 bg-white border border-[#e0e4ee] rounded-xl px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] flex items-center gap-2 text-sm text-[#8892a4] hover:text-[#0041c8] hover:border-[#0041c8] transition-colors z-50">
          <Sparkles className="w-4 h-4" />
          One-Click Optimize
        </button>
      </div>
    </AppShell>
  );
}
