import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Share2,
  Bookmark,
  MapPin,
  Briefcase,
  GraduationCap,
  Zap,
  Star,
} from "lucide-react";

interface JobDetailProps {
  job: any; // Khớp với dữ liệu từ jobs.section.tsx
}

export function JobDetailView({ job }: JobDetailProps) {
  if (!job) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400">
        <Briefcase className="w-16 h-16 mb-4 opacity-20" />
        <p>Chọn một công việc để xem chi tiết và phân tích AI</p>
      </div>
    );
  }

  // Tính toán thông số cho vòng tròn điểm AI
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (job.aiAnalysis.matchScore / 100) * circumference;

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center p-3 shadow-sm">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-1">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 font-medium">
              <span className="text-primary font-bold">{job.companyName}</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] uppercase font-bold tracking-wider">
                {job.workingType}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all active:scale-95">
            <Bookmark
              className={`w-5 h-5 ${job.isSaved ? "fill-primary text-primary" : "text-slate-400"}`}
            />
          </button>
          <button className="p-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all active:scale-95">
            <Share2 className="w-5 h-5 text-slate-400" />
          </button>
          <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary shadow-lg transition-all active:scale-95">
            Ứng Tuyển Ngay
          </button>
        </div>
      </div>

      {/* 2. AI Analysis Section (Match Score & Skills Analysis) */}
      <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-100 rounded-[32px] p-8 mb-10 shadow-sm">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                fill="transparent"
                stroke="#e2e8f0"
                strokeWidth="12"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                fill="transparent"
                stroke="#10b981"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900">
                {job.aiAnalysis.matchScore}%
              </span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
                AI Match
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-emerald-500 rounded-lg">
                <Sparkles className="w-4 h-4 text-white fill-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Tại sao bạn phù hợp?
              </h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
              Dựa trên CV của bạn, kỹ năng về{" "}
              <strong className="text-slate-900">
                {job.tags.slice(0, 2).join(", ")}
              </strong>{" "}
              rất khớp với yêu cầu của {job.companyName}. Bạn chỉ cần bổ sung
              thêm một chút kiến thức về các mảng còn thiếu để đạt tỷ lệ trúng
              tuyển cao nhất.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Kỹ năng
                  tương thích
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((s: string) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-white text-emerald-700 border border-emerald-100 rounded-xl text-xs font-bold shadow-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-3 tracking-widest flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-orange-500" /> Kỹ năng
                  còn thiếu
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.aiAnalysis.missingSkills?.map((s: string) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-white text-orange-700 border border-orange-100 rounded-xl text-xs font-bold shadow-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 & 4. Job Details Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Section: About */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              Về {job.companyName}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {job.details?.about}
            </p>
          </section>

          {/* Section: Role/Responsibilities */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Trách nhiệm công việc
            </h3>
            <ul className="space-y-3 text-slate-600">
              {job.details?.responsibilities?.map(
                (item: string, index: number) => (
                  <li key={index} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </section>

          {/* Section: Requirements (Must Have & Nice to Have) */}
          <section className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900">
              Yêu cầu ứng viên
            </h3>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Kỹ năng
                bắt buộc
              </h4>
              <ul className="space-y-3 text-slate-600">
                {job.details?.requirements?.mustHave?.map(
                  (item: string, index: number) => (
                    <li key={index} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Điểm
                cộng (Nice to have)
              </h4>
              <ul className="space-y-3 text-slate-600">
                {job.details?.requirements?.niceToHave?.map(
                  (item: string, index: number) => (
                    <li key={index} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </section>

          {/* Section: Benefits */}
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Quyền lợi & Phúc lợi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {job.details?.benefits?.map((benefit: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 5. Sidebar: AI Learning Roadmap */}
        <aside className="space-y-6">
          <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100 sticky top-4">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
              <GraduationCap className="w-5 h-5 text-primary" />
              <h4 className="font-bold">Lộ trình nâng cấp AI</h4>
            </div>
            <div className="space-y-6">
              {job.aiAnalysis.roadmap?.map((step: any, index: number) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-dashed border-slate-200 last:border-0 pb-6 last:pb-0"
                >
                  <div
                    className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 ${index === 0 ? "border-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]" : "border-slate-200"}`}
                  />
                  <p className="text-xs font-bold text-slate-900 mb-1">
                    {step.title}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors">
              Xem chi tiết lộ trình
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
