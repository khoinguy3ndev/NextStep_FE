import { MapPin, Briefcase, ArrowRight, Sparkles, Clock } from "lucide-react";

export const jobs = [
  {
    id: "uuid-job-001",
    title: "Senior Frontend Engineer",
    companyName: "Airbnb",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg",
    location: "San Francisco, USA",
    salaryRange: { text: "$120k - $165k" },
    postedAt: "2 giờ trước",
    source: { name: "Indeed" },
    tags: ["React", "TypeScript", "Tailwind"],
    workingType: "HYBRID",
    aiAnalysis: {
      matchScore: 88,
      missingSkills: ["Framer Motion", "Testing Library"],
      roadmap: [
        {
          title: "Nền tảng Animation",
          desc: "Hiểu easing, spring, layout transition.",
        },
        {
          title: "Framer Motion Core",
          desc: "Variants, gesture, shared layout.",
        },
        {
          title: "Testing Fundamentals",
          desc: "Jest & React Testing Library.",
        },
        { title: "Best Practices", desc: "Tăng coverage, tránh brittle test." },
      ],
    },
    details: {
      about:
        "Airbnb là nền tảng kết nối du lịch toàn cầu, chú trọng vào trải nghiệm người dùng tinh tế và hiệu suất vượt trội.",
      responsibilities: [
        "Xây dựng giao diện mượt mà, phản hồi nhanh cho hàng triệu người dùng.",
        "Phát triển và duy trì Design System nội bộ.",
        "Tối ưu hóa hiệu suất render và bundle size cho ứng dụng web.",
      ],
      requirements: {
        mustHave: [
          "3+ năm kinh nghiệm làm việc với React và TypeScript.",
          "Nắm vững các nguyên lý về UI/UX và Responsive Design.",
          "Thành thạo công cụ quản lý state như Redux hoặc Zustand.",
        ],
        niceToHave: [
          "Kinh nghiệm với Animation libraries (Framer Motion, GSAP).",
          "Kỹ năng viết Unit Test cho UI components.",
        ],
      },
      benefits: [
        "Môi trường làm việc toàn cầu, linh hoạt.",
        "Gói cổ phiếu nhân viên (RSUs) hấp dẫn.",
        "Ngân sách học tập và du lịch hàng năm lên tới $2,000.",
      ],
    },
  },
  {
    id: "uuid-job-002",
    title: "Backend Developer",
    companyName: "Shopify",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
    location: "Ottawa, Canada",
    salaryRange: { text: "$95k - $135k" },
    postedAt: "5 giờ trước",
    source: { name: "LinkedIn" },
    tags: ["Node.js", "PostgreSQL", "Redis"],
    workingType: "REMOTE",
    aiAnalysis: {
      matchScore: 72,
      missingSkills: ["GraphQL", "Docker"],
      roadmap: [
        {
          title: "GraphQL Basics",
          desc: "Schema, Query, Resolver và Apollo Server.",
        },
        {
          title: "Docker Fundamentals",
          desc: "Image, Container và Docker Compose.",
        },
        {
          title: "Production Setup",
          desc: "Triển khai API lên môi trường Cloud với Docker.",
        },
      ],
    },
    details: {
      about:
        "Shopify cung cấp nền tảng thương mại điện tử cho hàng triệu doanh nghiệp toàn cầu, yêu cầu hệ thống ổn định và bảo mật cực cao.",
      responsibilities: [
        "Thiết kế và triển khai các API xử lý hàng nghìn request mỗi giây.",
        "Tối ưu hóa truy vấn PostgreSQL và cấu trúc database.",
        "Xây dựng các microservices độc lập sử dụng cơ chế message queue.",
      ],
      requirements: {
        mustHave: [
          "Kinh nghiệm làm việc với Node.js hoặc Ruby on Rails.",
          "Hiểu sâu về kiến trúc hệ thống và Database design.",
          "Kỹ năng giải quyết vấn đề và tối ưu hóa performance Backend.",
        ],
        niceToHave: [
          "Kiến thức về GraphQL và kiến trúc Microservices.",
          "Sử dụng thành thạo Docker và CI/CD pipelines.",
        ],
      },
      benefits: [
        "Làm việc từ xa 100% thời gian.",
        "Lương tháng 13 và thưởng hiệu quả kinh doanh.",
        "Cung cấp thiết bị làm việc Macbook Pro đời mới nhất.",
      ],
    },
  },
  {
    id: "uuid-job-005",
    title: "Mobile App Developer",
    companyName: "Grab",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/Grab_Logo.svg",
    location: "TP. Hồ Chí Minh",
    salaryRange: { text: "$1,800 - $3,500" },
    postedAt: "6 giờ trước",
    source: { name: "TopCV" },
    tags: ["Flutter", "Firebase", "REST API"],
    workingType: "HYBRID",
    aiAnalysis: {
      matchScore: 89,
      missingSkills: ["CI/CD", "Testing"],
      roadmap: [
        {
          title: "CI/CD for Mobile",
          desc: "Tự động hóa quy trình Build và Deploy với Codemagic.",
        },
        {
          title: "Unit & Integration Test",
          desc: "Đảm bảo tính ổn định của ứng dụng Flutter.",
        },
      ],
    },
    details: {
      about:
        "Grab là siêu ứng dụng hàng đầu Đông Nam Á, cung cấp dịch vụ từ giao hàng, di chuyển đến tài chính.",
      responsibilities: [
        "Phát triển các tính năng mới cho ứng dụng Grab driver/consumer.",
        "Đảm bảo ứng dụng chạy mượt mà trên cả Android và iOS.",
        "Tích hợp các SDK bản đồ và thanh toán phức tạp.",
      ],
      requirements: {
        mustHave: [
          "Kinh nghiệm phát triển ứng dụng mobile với Flutter/Dart.",
          "Hiểu về kiến trúc BloC hoặc Provider.",
          "Thành thạo làm việc với RESTful APIs và WebSockets.",
        ],
        niceToHave: [
          "Có ứng dụng cá nhân đã publish lên Store.",
          "Kinh nghiệm triển khai CI/CD cho Mobile.",
        ],
      },
      benefits: [
        "Gói bảo hiểm sức khỏe tư nhân cao cấp.",
        "Môi trường đa quốc gia, giao tiếp tiếng Anh hàng ngày.",
        "Cơ hội chuyển công tác sang trụ sở Singapore.",
      ],
    },
  },
  {
    id: "uuid-job-006",
    title: "Junior Frontend Developer",
    companyName: "Spotify",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    location: "Stockholm, Sweden",
    salaryRange: { text: "$55k - $80k" },
    postedAt: "30 phút trước",
    source: { name: "LinkedIn" },
    tags: ["JavaScript", "React", "CSS"],
    workingType: "REMOTE",
    aiAnalysis: {
      matchScore: 76,
      missingSkills: ["TypeScript", "Testing"],
      roadmap: [
        {
          title: "TypeScript Cơ Bản",
          desc: "Hiểu type system, interface, generics.",
        },
        {
          title: "React + TypeScript",
          desc: "Áp dụng TS vào component & hooks.",
        },
        {
          title: "Testing UI",
          desc: "Làm quen React Testing Library.",
        },
      ],
    },
    details: {
      about:
        "Spotify xây dựng nền tảng âm nhạc hàng đầu thế giới với trải nghiệm cá nhân hóa mạnh mẽ.",
      responsibilities: [
        "Phát triển và cải thiện UI web player.",
        "Hỗ trợ tối ưu hiệu suất giao diện.",
        "Làm việc cùng team Product & Design.",
      ],
      requirements: {
        mustHave: [
          "Kiến thức tốt về HTML, CSS, JavaScript.",
          "Hiểu cơ bản về React.",
          "Tinh thần học hỏi và tư duy sản phẩm.",
        ],
        niceToHave: [
          "Có dự án cá nhân hoặc portfolio.",
          "Biết TypeScript là lợi thế.",
        ],
      },
      benefits: [
        "Môi trường quốc tế, remote linh hoạt.",
        "Trợ cấp thiết bị làm việc.",
      ],
    },
  },
  {
    id: "uuid-job-007",
    title: "Fullstack Developer",
    companyName: "VNG",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/8/83/VNG_Corporation_Logo.svg",
    location: "Đà Nẵng, Việt Nam",
    salaryRange: { text: "$1,200 - $2,500" },
    postedAt: "4 giờ trước",
    source: { name: "TopCV" },
    tags: ["Node.js", "React", "MongoDB"],
    workingType: "ONSITE",
    aiAnalysis: {
      matchScore: 82,
      missingSkills: ["System Design"],
      roadmap: [
        {
          title: "System Design Basics",
          desc: "Load balancing, caching, database scaling.",
        },
        {
          title: "Thực hành Mini Project",
          desc: "Thiết kế kiến trúc cho ứng dụng chat.",
        },
      ],
    },
    details: {
      about:
        "VNG là công ty công nghệ hàng đầu Việt Nam với hệ sinh thái sản phẩm đa dạng.",
      responsibilities: [
        "Phát triển tính năng frontend & backend.",
        "Thiết kế API và xử lý dữ liệu.",
        "Phối hợp cùng QA & Product.",
      ],
      requirements: {
        mustHave: [
          "Kinh nghiệm với JavaScript / Node.js.",
          "Hiểu về RESTful API.",
          "Có kiến thức cơ bản về database.",
        ],
        niceToHave: ["Biết React hoặc Vue.", "Hiểu về System Design."],
      },
      benefits: [
        "Lương thưởng cạnh tranh.",
        "Môi trường trẻ trung, năng động.",
      ],
    },
  },
  {
    id: "uuid-job-008",
    title: "QA / Test Engineer",
    companyName: "NashTech",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/0/01/NashTech_Logo.png",
    location: "Hà Nội, Việt Nam",
    salaryRange: { text: "$900 - $1,800" },
    postedAt: "1 ngày trước",
    source: { name: "VietnamWorks" },
    tags: ["Manual Testing", "API Testing", "Postman"],
    workingType: "HYBRID",
    aiAnalysis: {
      matchScore: 74,
      missingSkills: ["Automation"],
      roadmap: [
        {
          title: "Automation Testing Intro",
          desc: "Hiểu Selenium / Playwright.",
        },
        {
          title: "Viết Test Script",
          desc: "Tự động hóa test login & form.",
        },
      ],
    },
    details: {
      about:
        "NashTech cung cấp dịch vụ phát triển phần mềm cho khách hàng toàn cầu.",
      responsibilities: [
        "Thực hiện test chức năng hệ thống.",
        "Viết test case & báo cáo bug.",
        "Phối hợp cùng Dev team.",
      ],
      requirements: {
        mustHave: [
          "Hiểu quy trình kiểm thử phần mềm.",
          "Cẩn thận và tư duy logic tốt.",
        ],
        niceToHave: ["Biết Automation Testing."],
      },
      benefits: ["Hybrid linh hoạt.", "Đào tạo kỹ năng Automation."],
    },
  },
  {
    id: "uuid-job-009",
    title: "Product Manager",
    companyName: "Tiki",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/6/6e/Tiki.vn_logo.png",
    location: "TP. Hồ Chí Minh",
    salaryRange: { text: "$2,000 - $4,000" },
    postedAt: "7 giờ trước",
    source: { name: "LinkedIn" },
    tags: ["Product Strategy", "Agile", "Analytics"],
    workingType: "ONSITE",
    aiAnalysis: {
      matchScore: 68,
      missingSkills: ["SQL", "A/B Testing"],
      roadmap: [
        {
          title: "SQL cho Product",
          desc: "Query dữ liệu phục vụ decision.",
        },
        {
          title: "A/B Testing",
          desc: "Thiết kế và đánh giá experiment.",
        },
      ],
    },
    details: {
      about: "Tiki là nền tảng thương mại điện tử lớn tại Việt Nam.",
      responsibilities: [
        "Định hướng chiến lược sản phẩm.",
        "Phân tích hành vi người dùng.",
        "Làm việc với team Tech & Business.",
      ],
      requirements: {
        mustHave: [
          "Tư duy sản phẩm & phân tích tốt.",
          "Kỹ năng giao tiếp & quản lý stakeholder.",
        ],
        niceToHave: ["Biết SQL hoặc Data Analysis."],
      },
      benefits: [
        "Thu nhập cạnh tranh.",
        "Ảnh hưởng trực tiếp đến sản phẩm lớn.",
      ],
    },
  },
  {
    id: "uuid-job-010",
    title: "AI Engineer",
    companyName: "OpenAI",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    location: "Remote",
    salaryRange: { text: "$140k - $220k" },
    postedAt: "10 giờ trước",
    source: { name: "Indeed" },
    tags: ["Python", "LLMs", "Deep Learning"],
    workingType: "REMOTE",
    aiAnalysis: {
      matchScore: 64,
      missingSkills: ["MLOps", "Distributed Training"],
      roadmap: [
        {
          title: "MLOps Fundamentals",
          desc: "Model lifecycle & deployment.",
        },
        {
          title: "Distributed Training",
          desc: "Hiểu scaling & GPU training.",
        },
      ],
    },
    details: {
      about: "OpenAI nghiên cứu và phát triển các hệ thống AI tiên tiến.",
      responsibilities: [
        "Xây dựng & tối ưu mô hình ML.",
        "Triển khai hệ thống AI production.",
        "Nghiên cứu cải tiến thuật toán.",
      ],
      requirements: {
        mustHave: [
          "Kinh nghiệm Python & Machine Learning.",
          "Hiểu Deep Learning.",
        ],
        niceToHave: ["Kinh nghiệm MLOps / Cloud."],
      },
      benefits: ["Remote toàn cầu.", "Làm việc với công nghệ AI tiên tiến."],
    },
  },
];

interface FeaturedJobsProps {
  layout?: "full" | "compact";
  onSelectJob?: (job: any) => void;
  selectedId?: string;
}

export function FeaturedJobs({
  layout = "full",
  onSelectJob,
  selectedId,
}: FeaturedJobsProps) {
  if (layout === "compact") {
    return (
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => onSelectJob?.(job)}
            className={`group p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
              selectedId === job.id
                ? "border-primary bg-primary/5 ring-1 ring-primary"
                : "bg-white border-slate-200 hover:border-primary/50 hover:shadow-md"
            }`}
          >
            <div className="flex justify-between items-start mb-2 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center p-1.5">
                <img
                  src={job.companyLogo}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg border border-emerald-100">
                <Sparkles className="w-3 h-3 fill-emerald-500" />
                <span className="text-[10px] font-bold">
                  {job.aiAnalysis.matchScore}%
                </span>
              </div>
            </div>

            <h4 className="font-bold text-slate-900 truncate mb-1 group-hover:text-primary transition-colors">
              {job.title}
            </h4>
            <p className="text-xs text-slate-500 mb-3">{job.companyName}</p>

            <div className="flex justify-between items-center relative z-10">
              <p className="text-sm font-black text-primary">
                {job.salaryRange.text}
              </p>
              <span className="text-[10px] text-slate-400 font-bold uppercase">
                {job.source.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // --- GIAO DIỆN FULL (Dành cho Trang Chủ) ---
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                Việc Làm Nổi Bật
              </h2>
            </div>
            <p className="text-muted-foreground text-lg">
              Đề xuất thông minh dựa trên kỹ năng của bạn.
            </p>
          </div>
          <button className="text-primary font-semibold flex items-center gap-2 hover:underline transition-all">
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="group bg-white rounded-2xl border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 p-5 md:p-6 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                <div className="flex items-start gap-5 flex-1">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center shadow-sm p-2">
                    <img
                      src={job.companyLogo}
                      alt=""
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">
                        {job.source.name}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-medium mb-3">
                      {job.companyName}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded-lg text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {job.postedAt}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl border border-emerald-100">
                    <Sparkles className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span className="text-sm font-bold">
                      {job.aiAnalysis.matchScore}% Match
                    </span>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-0.5">
                      Mức Lương
                    </p>
                    <p className="text-xl font-black text-primary">
                      {job.salaryRange.text}
                    </p>
                  </div>
                  <button className="bg-slate-900 text-white hover:bg-primary transition-all px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
