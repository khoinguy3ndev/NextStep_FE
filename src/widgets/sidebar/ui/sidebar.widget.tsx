import { Briefcase, Bookmark, FileText, Send, Sparkles } from "lucide-react";

const menuItems = [
  { icon: Briefcase, label: "Job Feed", active: true },
  { icon: Bookmark, label: "Saved Jobs", active: false },
  { icon: FileText, label: "Resume Analysis", active: false },
  { icon: Send, label: "Applications", active: false },
];

export function Sidebar() {
  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
          Navigation
        </p>
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              item.active
                ? "bg-primary/10 text-primary"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </div>

      {/* AI Recommendation Card */}
      <div className="mt-auto p-4 bg-primary/5 rounded-2xl border border-primary/10">
        <div className="flex items-center gap-2 mb-2 text-primary">
          <Sparkles className="w-4 h-4 fill-primary" />
          <span className="text-xs font-bold uppercase">AI Recommendation</span>
        </div>
        <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
          Your resume matches 85% of recent Senior UI openings. Apply now!
        </p>
        <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors">
          View Jobs
        </button>
      </div>
    </div>
  );
}
