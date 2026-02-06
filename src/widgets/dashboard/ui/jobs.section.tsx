import { MapPin, Briefcase, ArrowRight } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Vietnam",
    logo: "🏢",
    salary: "30 - 45 Triệu",
    location: "Ho Chi Minh City",
    tags: ["React", "TypeScript", "Node.js"],
    experience: "5+ năm",
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Innovate Solutions",
    logo: "💼",
    salary: "25 - 40 Triệu",
    location: "Hanoi",
    tags: ["Java", "React", "AWS"],
    experience: "3+ năm",
  },
  {
    id: 3,
    title: "Python Data Scientist",
    company: "AI Labs",
    logo: "🔬",
    salary: "28 - 50 Triệu",
    location: "Ho Chi Minh City",
    tags: ["Python", "Machine Learning", "SQL"],
    experience: "4+ năm",
  },
  {
    id: 4,
    title: "QA Automation Engineer",
    company: "Quality First Tech",
    logo: "✓",
    salary: "20 - 32 Triệu",
    location: "Da Nang",
    tags: ["Selenium", "Java", "Jenkins"],
    experience: "2+ năm",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    logo: "☁️",
    salary: "35 - 55 Triệu",
    location: "Ho Chi Minh City",
    tags: ["Docker", "Kubernetes", "AWS"],
    experience: "5+ năm",
  },
  {
    id: 6,
    title: "Product Manager",
    company: "Digital Ventures",
    logo: "📱",
    salary: "32 - 60 Triệu",
    location: "Hanoi",
    tags: ["Strategy", "Analytics", "Leadership"],
    experience: "6+ năm",
  },
];

export function FeaturedJobs() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Việc Làm Nổi Bật
            </h2>
          </div>
          <p className="text-muted-foreground">
            Các vị trí hàng đầu đang tuyển dụng ngay bây giờ
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-border hover:shadow-lg transition-shadow p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{job.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground font-medium mb-3">
                        {job.company}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary and Button */}
                <div className="flex flex-col sm:items-end gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Mức Lương
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {job.salary}
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-semibold flex items-center gap-2 justify-center w-full sm:w-auto">
                    Ứng Tuyển
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Jobs Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors rounded-lg font-semibold">
            Xem Tất Cả Việc Làm
          </button>
        </div>
      </div>
    </section>
  );
}
