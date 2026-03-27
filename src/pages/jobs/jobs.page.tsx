import { useState } from "react";
import { Sidebar } from "@/widgets/sidebar";
import { FeaturedJobs } from "@/widgets/dashboard/ui/jobs.section";
import { JobDetailView } from "@/widgets/job-detail";
import { jobs } from "@/widgets/dashboard/ui/jobs.section"; // Import data mẫu

export function JobsPage() {
  // Mặc định chọn job đầu tiên trong danh sách
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <main className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r hidden lg:block">
          <Sidebar />
        </aside>

        <section className="w-full lg:w-[400px] border-r overflow-y-auto p-4 bg-slate-50">
          <div className="mb-4 font-bold text-lg text-slate-700">
            {jobs.length} Jobs Found
          </div>
          {/* Truyền hàm setSelectedJob và id đang chọn vào list */}
          <FeaturedJobs
            layout="compact"
            onSelectJob={setSelectedJob}
            selectedId={selectedJob.id}
          />
        </section>

        <section className="flex-1 overflow-y-auto p-8">
          {/* Truyền dữ liệu job đang chọn vào trang chi tiết */}
          <JobDetailView job={selectedJob} />
        </section>
      </main>
    </div>
  );
}
