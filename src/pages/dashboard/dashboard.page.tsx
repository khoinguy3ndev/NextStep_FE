import { useState } from "react";
import {
  LayoutDashboard,
  Scan,
  FileText,
  Bookmark,
  Settings,
  Bell,
  User,
} from "lucide-react";

type ScanRecord = {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  matchScore: number;
};

const recentScans: ScanRecord[] = [
  {
    id: "1",
    jobTitle: "Senior React Developer",
    company: "Tech Corp",
    date: "Mar 25, 2026",
    matchScore: 85,
  },
  {
    id: "2",
    jobTitle: "Frontend Engineer",
    company: "Digital Solutions",
    date: "Mar 23, 2026",
    matchScore: 72,
  },
  {
    id: "3",
    jobTitle: "Full Stack Developer",
    company: "StartUp Inc",
    date: "Mar 20, 2026",
    matchScore: 58,
  },
  {
    id: "4",
    jobTitle: "UI Developer",
    company: "Creative Agency",
    date: "Mar 18, 2026",
    matchScore: 91,
  },
  {
    id: "5",
    jobTitle: "JavaScript Developer",
    company: "Web Services Ltd",
    date: "Mar 15, 2026",
    matchScore: 45,
  },
];

type NavItem = {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "new-scan", label: "New Scan", icon: Scan },
  { id: "my-cvs", label: "My CVs", icon: FileText },
  { id: "saved-jobs", label: "Saved Jobs", icon: Bookmark },
  { id: "settings", label: "Settings", icon: Settings },
];

function getScoreClass(score: number) {
  if (score < 50) return "bg-red-100 text-red-800";
  if (score < 75) return "bg-amber-100 text-amber-800";
  return "bg-green-100 text-green-800";
}

export function DashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div className="min-h-screen flex text-[#0D0D0D] bg-white">
      <aside className="w-[240px] bg-[#F7F7F7] border-r border-[#E5E5E5] flex flex-col">
        <div className="p-6">
          <p className="text-xl font-bold">NextStepAI</p>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeNav;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={[
                  "w-full rounded-lg px-3 py-2 text-left",
                  "flex items-center gap-3 border border-transparent",
                  isActive
                    ? "bg-[#e5e5e5] text-black"
                    : "text-[#6B6B6B] hover:bg-white hover:border-[#E5E5E5]",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-3 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2">
            <div className="h-9 w-9 rounded-full border border-[#E5E5E5] bg-[#F7F7F7] flex items-center justify-center">
              <User className="h-4 w-4 text-[#6B6B6B]" />
            </div>
            <p className="text-sm font-medium">John Doe</p>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-[#E5E5E5] px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold">Good morning, John</h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-9 w-9 rounded-lg border border-[#E5E5E5] flex items-center justify-center text-[#6B6B6B]"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm font-semibold text-[#0D0D0D]"
            >
              Upgrade to Pro
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto w-full space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              <article className="bg-white border border-[#E5E5E5] rounded-xl p-6">
                <p className="text-3xl font-bold">12</p>
                <p className="mt-2 text-sm text-[#6B6B6B]">Total Scans</p>
              </article>
              <article className="bg-white border border-[#E5E5E5] rounded-xl p-6">
                <p className="text-3xl font-bold">67%</p>
                <p className="mt-2 text-sm text-[#6B6B6B]">Avg Score</p>
              </article>
              <article className="bg-white border border-[#E5E5E5] rounded-xl p-6">
                <p className="text-3xl font-bold">3</p>
                <p className="mt-2 text-sm text-[#6B6B6B]">CVs Saved</p>
              </article>
              <article className="bg-white border border-[#E5E5E5] rounded-xl p-6">
                <p className="text-3xl font-bold">8</p>
                <p className="mt-2 text-sm text-[#6B6B6B]">Jobs Saved</p>
              </article>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Recent Scans</h2>
              <div className="bg-white border border-[#E5E5E5] rounded-xl overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr>
                      <th className="text-left text-xs uppercase text-[#6B6B6B] font-bold border-b border-[#E5E5E5] px-6 py-3">
                        Job Title
                      </th>
                      <th className="text-left text-xs uppercase text-[#6B6B6B] font-bold border-b border-[#E5E5E5] px-6 py-3">
                        Company
                      </th>
                      <th className="text-left text-xs uppercase text-[#6B6B6B] font-bold border-b border-[#E5E5E5] px-6 py-3">
                        Date
                      </th>
                      <th className="text-left text-xs uppercase text-[#6B6B6B] font-bold border-b border-[#E5E5E5] px-6 py-3">
                        Match Score
                      </th>
                      <th className="text-left text-xs uppercase text-[#6B6B6B] font-bold border-b border-[#E5E5E5] px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentScans.map((scan) => (
                      <tr
                        key={scan.id}
                        className="border-b border-[#E5E5E5] last:border-b-0"
                      >
                        <td className="px-6 py-4 text-sm font-semibold">
                          {scan.jobTitle}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B6B6B]">
                          {scan.company}
                        </td>
                        <td className="px-6 py-4 text-sm text-[#6B6B6B]">
                          {scan.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold w-fit inline-block ${getScoreClass(scan.matchScore)}`}
                          >
                            {scan.matchScore}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            type="button"
                            className="text-[#0041c8] font-semibold text-sm"
                          >
                            View Results
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#F7F7F7] border border-[#E5E5E5] rounded-xl p-8 flex justify-between items-center mt-8">
              <h3 className="text-lg font-bold">
                Ready to analyze your next application?
              </h3>
              <button
                type="button"
                className="bg-[#0041c8] text-white px-6 py-3 rounded-lg font-bold"
              >
                Start New Scan →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
