import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  FileText,
  LogOut,
  HelpCircle,
  Home,
  Linkedin,
  Menu,
  Shield,
  Plus,
  Search,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { BRAND } from "@/shared/config/brand";

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  to?: "/dashboard" | "/resume-optimizer" | "/jobs";
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, to: "/dashboard" },
  {
    id: "ai-optimize",
    label: "AI Optimize",
    icon: Sparkles,
    to: "/resume-optimizer",
  },
  { id: "cover-letter", label: "AI Cover Letter", icon: FileText },
  { id: "linkedin", label: "LinkedIn Scan", icon: Linkedin },
  { id: "job-tracker", label: "Job Tracker", icon: Calendar },
  { id: "find-jobs", label: "Find Jobs", icon: Search, to: "/jobs" },
  { id: "resume-builder", label: "Resume Builder", icon: FileText },
  { id: "resume-manager", label: "Resume Manager", icon: FileText },
  { id: "scan-history", label: "Scan History", icon: Search },
];

type AppShellProps = {
  children: ReactNode;
  fullWidth?: boolean;
};

export function AppShell({ children, fullWidth = false }: AppShellProps) {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!userMenuRef.current) return;

      if (!userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const collapsedBtnClass =
    "mx-auto w-10 h-10 rounded-lg flex items-center justify-center";
  const expandedBtnClass =
    "mx-2 w-[calc(100%-16px)] h-10 px-3 rounded-lg flex items-center gap-3 text-left";

  return (
    <div className="flex h-screen bg-[#f5f6fa] text-[#1a1a2e] font-[Instrument_Sans,sans-serif]">
      <aside
        className={`${
          isCollapsed ? "w-[72px]" : "w-[220px]"
        } bg-white border-r border-[#e8eaf0] flex flex-col overflow-hidden flex-shrink-0 transition-all duration-300 z-10`}
      >
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

        <div className="pt-4 pb-2">
          <button
            className={`${
              isCollapsed ? collapsedBtnClass : expandedBtnClass
            } bg-[#0041c8] text-white font-semibold hover:bg-[#002d8a] transition-all`}
            title={isCollapsed ? "New Scan" : undefined}
          >
            <Plus className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="whitespace-nowrap">New Scan</span>
            )}
          </button>
        </div>

        <nav className="flex-1 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.to
              ? location.pathname === item.to
              : item.id === activeTab;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.to) {
                    navigate({ to: item.to });
                    return;
                  }

                  setActiveTab(item.id);
                }}
                className={`${
                  isCollapsed ? collapsedBtnClass : expandedBtnClass
                } transition-colors ${
                  isActive
                    ? "bg-[#f0f3ff] text-[#0041c8] font-semibold"
                    : "text-[#4a5068] hover:bg-[#f0f3ff] hover:text-[#0041c8]"
                }`}
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

        <div className="border-t border-[#f0f1f5] py-4">
          <button
            className={`${
              isCollapsed ? collapsedBtnClass : expandedBtnClass
            } text-[#4a5068] hover:bg-[#f0f3ff] hover:text-[#0041c8] transition-colors`}
            title={isCollapsed ? "Help" : undefined}
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">Help</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-[#e8eaf0] flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="text-2xl font-bold text-[#0f172a]">Welcome, Alex!</h1>
          <div className="flex items-center gap-3">
            <button className="bg-yellow-50 text-amber-700 border border-yellow-300 rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-yellow-100 transition-colors">
              ⭐ Get 7 days free
            </button>
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="w-8 h-8 bg-[#e8eaf0] rounded-full flex items-center justify-center text-xs font-semibold text-[#4a5068] cursor-pointer hover:bg-[#dfe4ec] transition-colors"
              >
                A
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-10 w-72 bg-white border border-[#e8eaf0] rounded-xl shadow-xl overflow-hidden z-30">
                  <div className="px-4 py-3 border-b border-[#eef1f6] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#e8eaf0] text-[#64748b] flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0f172a]">
                        Alex
                      </p>
                      <p className="text-xs text-[#64748b]">
                        alex@nextstepai.com
                      </p>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 flex items-center gap-2 text-left text-sm text-[#334155] hover:bg-[#f8fafc]"
                    >
                      <Settings className="w-4 h-4" />
                      Account Settings
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 flex items-center gap-2 text-left text-sm text-[#334155] hover:bg-[#f8fafc]"
                    >
                      <Shield className="w-4 h-4" />
                      Privacy Policy
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-2.5 flex items-center gap-2 text-left text-sm text-[#334155] hover:bg-[#f8fafc]"
                    >
                      <FileText className="w-4 h-4" />
                      Terms
                    </button>
                  </div>

                  <div className="border-t border-[#eef1f6] p-2">
                    <button
                      type="button"
                      className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-left text-sm text-[#b42318] hover:bg-[#fff5f5]"
                    >
                      <LogOut className="w-4 h-4" />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          <div className={fullWidth ? "w-full" : "max-w-6xl mx-auto"}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
