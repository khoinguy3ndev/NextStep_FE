import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Plus,
  Zap,
  FileText,
  Users,
  Calendar,
  Search,
  MapPin,
  Star,
  CloudUpload,
  ArrowRight,
  X,
  HelpCircle,
  Home,
  Menu,
} from "lucide-react";
import { BRAND } from "@/shared/config/brand";

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "ai-optimize", label: "AI Optimize", icon: Zap },
  { id: "cover-letter", label: "AI Cover Letter", icon: FileText },
  { id: "linkedin", label: "LinkedIn Scan", icon: Users },
  { id: "job-tracker", label: "Job Tracker", icon: Calendar },
  { id: "find-jobs", label: "Find Jobs", icon: Search },
  { id: "resume-builder", label: "Resume Builder", icon: FileText },
  { id: "resume-manager", label: "Resume Manager", icon: FileText },
  { id: "scan-history", label: "Scan History", icon: Search },
];

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [showPromo, setShowPromo] = useState(true);
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const collapsedBtnClass =
    "mx-auto w-10 h-10 rounded-lg flex items-center justify-center";
  const expandedBtnClass =
    "mx-2 w-[calc(100%-16px)] h-10 px-3 rounded-lg flex items-center gap-3 text-left";

  const canScan = resumeText.trim() && jdText.trim();

  return (
    <div className="flex h-screen bg-[#f5f6fa] text-[#1a1a2e] font-[Instrument_Sans,sans-serif]">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-[72px]" : "w-[220px]"
        } bg-white border-r border-[#e8eaf0] flex flex-col overflow-hidden flex-shrink-0 transition-all duration-300 z-10`}
      >
        {/* Logo & Toggle */}
        <div
          className={`h-16 flex items-center border-b border-[#f0f1f5] ${isCollapsed ? "justify-center" : "px-3 gap-2"}`}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-10 h-10 flex items-center justify-center text-[#4a5068] hover:bg-[#f0f3ff] hover:text-[#0041c8] rounded-md transition-colors flex-shrink-0"
            title="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {!isCollapsed && (
            <Link
              to="/"
              className="block flex-1 overflow-hidden whitespace-nowrap"
            >
              <div className="text-lg font-bold text-[#0041c8] tracking-tight truncate">
                {BRAND.name}
              </div>
            </Link>
          )}
        </div>

        {/* New Scan Button */}
        <div className="pt-4 pb-2">
          <button
            className={`
              ${isCollapsed ? collapsedBtnClass : expandedBtnClass} 
              bg-[#0041c8] text-white font-semibold hover:bg-[#002d8a] transition-all
            `}
            title={isCollapsed ? "New Scan" : undefined}
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="whitespace-nowrap">New Scan</span>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  ${isCollapsed ? collapsedBtnClass : expandedBtnClass}
                  transition-colors
                  ${
                    isActive
                      ? "bg-[#f0f3ff] text-[#0041c8] font-semibold"
                      : "text-[#4a5068] hover:bg-[#f0f3ff] hover:text-[#0041c8]"
                  }
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Help */}
        <div className="border-t border-[#f0f1f5] py-4">
          <button
            className={`
              ${isCollapsed ? collapsedBtnClass : expandedBtnClass} 
              text-[#4a5068] hover:bg-[#f0f3ff] hover:text-[#0041c8] transition-colors
            `}
            title={isCollapsed ? "Help" : undefined}
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Help</span>}
          </button>
        </div>
      </aside>

      {/* Main Content (Giữ nguyên không đổi) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#e8eaf0] flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-2xl font-bold text-[#0f172a]">Welcome, Alex!</h1>
          <div className="flex items-center gap-3">
            <button className="bg-yellow-50 text-amber-700 border border-yellow-300 rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-yellow-100 transition-colors">
              ⭐ Get 7 days free
            </button>
            <div className="w-8 h-8 bg-[#e8eaf0] rounded-full flex items-center justify-center text-xs font-semibold text-[#4a5068] cursor-pointer">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="max-w-6xl mx-auto space-y-5">
            {/* Promo Banner */}
            {showPromo && (
              <div className="bg-[#f0f4ff] border border-[#c7d4f8] rounded-xl p-4 flex gap-3 relative">
                <div className="w-20 h-16 bg-white rounded border border-[#d0d8f0] flex-shrink-0 flex items-center justify-center">
                  <div className="text-[10px] space-y-1 w-16">
                    <div className="h-1 bg-[#0041c8] rounded opacity-60"></div>
                    <div className="h-1 bg-[#dde3f5] rounded"></div>
                    <div className="h-1 bg-[#dde3f5] rounded w-2/3"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-block bg-[#0041c8] text-white text-xs font-bold px-2 py-0.5 rounded mb-1">
                    NEW
                  </div>
                  <h3 className="text-base font-bold text-[#0f172a] mb-1">
                    One-Click Optimize your resume
                  </h3>
                  <p className="text-sm text-[#4a5068] leading-relaxed mb-2">
                    Smarter, simpler, faster resume tailoring. All with the
                    peace of mind that comes from knowing that your original
                    content is preserved.{" "}
                    <a href="#" className="text-[#0041c8] font-semibold">
                      Learn More
                    </a>
                  </p>
                  <a href="#" className="text-[#0041c8] font-semibold text-sm">
                    ✦ Try 7 days for free
                  </a>
                </div>
                <button
                  onClick={() => setShowPromo(false)}
                  className="absolute right-3 top-3 text-[#8892a4] hover:text-[#0f172a] text-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* New Scan Section */}
            <div className="bg-white border border-[#e8eaf0] rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#0f172a] mb-5">
                New scan
              </h2>

              <div className="grid grid-cols-2 gap-5 mb-6">
                {/* Step 1 Column */}
                <div className="border border-[#e8eaf0] rounded-xl overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 bg-[#f8fafc] border-b border-[#e8eaf0]">
                    <label className="text-sm font-semibold text-[#0f172a]">
                      Step 1: Upload a resume
                    </label>
                    <a
                      href="#"
                      className="text-sm text-[#4a5068] flex items-center gap-1.5 hover:text-[#0041c8] transition-colors"
                    >
                      <Star className="w-4 h-4" />
                      Saved Resumes
                    </a>
                  </div>
                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col gap-4 bg-[#f8fafc]/50">
                    <textarea
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      placeholder="Copy and paste resume here."
                      className="w-full flex-1 min-h-[180px] bg-transparent text-sm text-[#4a5068] resize-none outline-none placeholder:text-[#94a3b8]"
                    />
                    <label className="flex items-center justify-center gap-2 w-full py-2.5 border border-dashed border-[#c0c8e0] rounded-lg text-sm font-medium text-[#4a5068] bg-white cursor-pointer hover:border-[#0041c8] hover:text-[#0041c8] transition-colors shadow-sm">
                      <CloudUpload className="w-4 h-4" />
                      Drag & Drop or Upload Your Resume
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                      />
                    </label>
                  </div>
                </div>

                {/* Step 2 Column */}
                <div className="border border-[#e8eaf0] rounded-xl overflow-hidden flex flex-col">
                  {/* Header */}
                  <div className="flex items-center p-4 bg-[#f8fafc] border-b border-[#e8eaf0]">
                    <label className="text-sm font-semibold text-[#0f172a]">
                      Step 2: Paste a job description
                    </label>
                  </div>
                  {/* Content */}
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

              {/* Action Footer */}
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

                  {/* Giả lập trạng thái disabled giống trong ảnh */}
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-[#f1f5f9] text-[#94a3b8] rounded-md text-sm font-semibold cursor-not-allowed">
                    <Zap className="w-4 h-4" />
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

            {/* Cards Row */}
            <div className="grid grid-cols-3 gap-3.5">
              {/* Latest Resume Scan */}
              <div className="bg-white border border-[#e8eaf0] rounded-xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#0f172a]">
                    Latest Resume Scan
                  </h3>
                  <a href="#" className="text-[#0041c8] text-sm">
                    →
                  </a>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-[#f0f3ff] rounded-lg flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5 text-[#0041c8]" />
                  </div>
                  <p className="text-sm text-[#8892a4] mb-3">
                    Scan your resume to start optimizing it for a new job
                    opportunity.
                  </p>
                  <button className="border border-[#0041c8] text-[#0041c8] bg-white rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-[#f0f4ff] transition-colors">
                    Scan Resume
                  </button>
                </div>
              </div>

              {/* Job Tracker */}
              <div className="bg-white border border-[#e8eaf0] rounded-xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <h3 className="text-base font-bold text-[#0f172a]">
                      Job Tracker
                    </h3>
                  </div>
                  <a href="#" className="text-[#0041c8] text-sm">
                    →
                  </a>
                </div>
                <p className="text-xs text-[#8892a4] mb-3">Next Interview</p>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-[#f5f6fa] rounded-lg flex items-center justify-center mb-3">
                    <Calendar className="w-5 h-5 text-[#b0b8cc]" />
                  </div>
                  <p className="text-sm text-[#b0b8cc]">
                    No upcoming interview
                  </p>
                </div>
              </div>

              {/* LinkedIn Report */}
              <div className="bg-white border border-[#e8eaf0] rounded-xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#0a66c2] rounded flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-[#0f172a]">
                      LinkedIn Report
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-[#4a5068] leading-relaxed mb-3 flex-1">
                  Optimize your LinkedIn profile to match your preferred job
                  listings.
                </p>
                <button className="border border-[#0041c8] text-[#0041c8] bg-white rounded-lg px-3 py-1.5 text-sm font-semibold hover:bg-[#f0f4ff] transition-colors">
                  Optimize LinkedIn
                </button>
              </div>
            </div>

            {/* AI Job Match */}
            <div className="bg-white border border-[#e8eaf0] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-base font-bold text-[#0f172a]">
                    AI Job Match
                  </h2>
                </div>
                <a href="#" className="text-sm text-[#0041c8]">
                  View all →
                </a>
              </div>
              <p className="text-sm text-[#8892a4] mb-4">
                Get personalized skills and qualifications, and let {BRAND.name}{" "}
                match your best-fit jobs.
              </p>

              {/* Search Row */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8892a4] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="w-full pl-8 pr-3 py-2 border border-[#e0e4ee] rounded-lg text-sm outline-none focus:border-[#0041c8] transition-colors"
                  />
                </div>
                <div className="w-52 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-[#8892a4] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Your current location"
                    className="w-full pl-8 pr-3 py-2 border border-[#e0e4ee] rounded-lg text-sm outline-none focus:border-[#0041c8] transition-colors"
                  />
                </div>
                <button className="px-4 py-2 bg-[#0041c8] text-white rounded-lg text-sm font-semibold hover:bg-[#002d8a] transition-colors">
                  Search
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <button className="px-3 py-1.5 border border-[#e0e4ee] rounded-lg text-sm text-[#4a5068] hover:border-[#0041c8] hover:text-[#0041c8] transition-colors">
                  Date range ▾
                </button>
                <button className="px-3 py-1.5 border border-[#e0e4ee] rounded-lg text-sm text-[#4a5068] hover:border-[#0041c8] hover:text-[#0041c8] transition-colors">
                  Job type ▾
                </button>
                <button className="px-3 py-1.5 border border-[#e0e4ee] rounded-lg text-sm text-[#4a5068] hover:border-[#0041c8] hover:text-[#0041c8] transition-colors">
                  Remote option ▾
                </button>
                <span className="text-sm text-[#8892a4] cursor-pointer hover:text-[#4a5068]">
                  Clear all
                </span>
                <div className="ml-auto text-sm text-[#4a5068] flex items-center gap-1">
                  ↕ Relevance
                </div>
              </div>

              {/* Empty State */}
              <div className="text-center p-8 bg-[#f8f9ff] border border-dashed border-[#c7d4f8] rounded-lg">
                <div className="w-16 h-16 mx-auto mb-4 relative">
                  <div className="absolute top-1 left-1 w-10 h-12 bg-white border border-[#c7d4f8] rounded p-1.5 space-y-0.5">
                    <div className="h-1 bg-[#dde3f5] rounded w-full"></div>
                    <div className="h-1 bg-[#dde3f5] rounded w-full"></div>
                    <div className="h-1 bg-[#dde3f5] rounded w-2/3"></div>
                  </div>
                  <div className="absolute -top-1 left-4 w-10 h-12 bg-white border border-[#c7d4f8] rounded p-1.5 space-y-0.5">
                    <div className="text-[7px] bg-green-500 text-white font-bold px-1 rounded mb-1">
                      TOP MATCH
                    </div>
                    <div className="h-1 bg-[#0041c8] rounded w-full opacity-40"></div>
                    <div className="h-1 bg-[#dde3f5] rounded w-full"></div>
                    <div className="h-1 bg-[#dde3f5] rounded w-2/3"></div>
                  </div>
                  <div className="absolute -top-2 -right-1 w-5 h-5 bg-[#0041c8] rounded-full flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#0f172a] mb-1">
                  Let {BRAND.name} match jobs for you
                </h3>
                <p className="text-sm text-[#8892a4] leading-relaxed max-w-xs mx-auto mb-3">
                  {BRAND.name} matches you with jobs based on your resume and
                  experience, not just job titles or keywords like traditional
                  job boards. Create a scan to unlock personalized job
                  recommendations.
                </p>
                <button className="text-[#0041c8] text-sm font-semibold cursor-pointer">
                  + Create New Scan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
