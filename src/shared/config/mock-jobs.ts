export type JobBadge = "top" | "good";
export type RemoteOption = "on-site" | "hybrid" | "remote";

export type MockJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAt: string; // ISO date string; FE computes "x days ago" from this field.
  jobType: string;
  remoteOption: RemoteOption;
  badge: JobBadge;
  description: string;
  responsibilities: string[];
  requirements: string[];
  locked?: boolean;
};

export const mockJobs: MockJob[] = [
  {
    id: "job-1",
    title: "Senior Fullstack Software Engineer",
    company: "Upskills",
    location: "Ho Chi Minh City, Vietnam",
    postedAt: "2026-04-10T09:00:00Z",
    jobType: "Full-time",
    remoteOption: "hybrid",
    badge: "top",
    locked: true,
    description:
      "Upskills is hiring a senior fullstack engineer to build scalable fintech-grade products and APIs.",
    responsibilities: [
      "Design and ship end-to-end features across frontend and backend.",
      "Collaborate with product and QA teams to deliver stable releases.",
      "Improve performance and reliability across services.",
      "Mentor junior engineers and review pull requests.",
    ],
    requirements: [
      "4+ years in fullstack development.",
      "Strong TypeScript and Node.js skills.",
      "Experience with React and relational databases.",
      "Good communication and ownership mindset.",  
    ],
  },
  {
    id: "job-2",
    title: "Senior Backend Developer",
    company: "UNIT Technology Corporation",
    location: "District 4, Ho Chi Minh City, Vietnam",
    postedAt: "2026-04-10T07:00:00Z",
    jobType: "Full-time",
    remoteOption: "on-site",
    badge: "good",
    description:
      "Build robust backend services for high-traffic business systems in a product team.",
    responsibilities: [
      "Develop and maintain backend APIs.",
      "Design database schema and optimize queries.",
      "Write tests and maintain code quality.",
      "Support production issues and monitoring.",
    ],
    requirements: [
      "3+ years of backend development experience.",
      "Strong SQL and API design knowledge.",
      "Familiarity with CI/CD and Git workflow.",
      "Experience with NestJS is a plus.",
      "Experience in fintech or high-reliability systems is a plus.",
      "Ability to work in a fast-paced startup environment.",
      "Passion for building products that users love.",
      "Fluency in English for communication with global teams.",
      "Bachelor's degree in Computer Science or related field, or equivalent experience.",
      "Strong problem-solving skills and attention to detail.",
      "Experience with cloud platforms (AWS/GCP/Azure) is a plus.",
      "Good teamwork and communication skills.",
    ],
  },
  {
    id: "job-3",
    title: "Java Fullstack Developer",
    company: "Axon Active",
    location: "District 9, Ho Chi Minh City, Vietnam",
    postedAt: "2026-04-06T03:00:00Z",
    jobType: "Full-time",
    remoteOption: "hybrid",
    badge: "good",
    description:
      "Join Axon Active to build enterprise web platforms with Java and modern frontend stacks.",
    responsibilities: [
      "Implement features in Java backend services.",
      "Build frontend pages and reusable components.",
      "Participate in sprint planning and code review.",
      "Collaborate with QA for release readiness.",
    ],
    requirements: [
      "Solid Java and Spring knowledge.",
      "Frontend experience with React or Angular.",
      "Understanding of REST APIs and SQL.",
      "Good problem-solving ability.",
    ],
  },
  {
    id: "job-4",
    title: "[Hybrid Da Nang] .NET Developer",
    company: "Rainscales",
    location: "Da Nang, Vietnam",
    postedAt: "2026-04-06T01:00:00Z",
    jobType: "Full-time",
    remoteOption: "hybrid",
    badge: "good",
    description:
      "Develop and maintain .NET business applications with a collaborative hybrid team.",
    responsibilities: [
      "Build API endpoints and core modules.",
      "Refactor legacy code and improve maintainability.",
      "Write unit tests and technical documentation.",
      "Coordinate with cross-functional teams.",
    ],
    requirements: [
      "2+ years of .NET development.",
      "Good understanding of OOP and clean code.",
      "Experience with SQL Server/PostgreSQL.",
      "Strong teamwork and communication.",
    ],
  },
  {
    id: "job-5",
    title: "Senior Software Engineer (Node.js)",
    company: "Sunbytes",
    location: "Hanoi, Vietnam",
    postedAt: "2026-04-01T02:00:00Z",
    jobType: "Full-time",
    remoteOption: "remote",
    badge: "good",
    description:
      "Lead backend feature delivery for Node.js services and cloud-native workloads.",
    responsibilities: [
      "Own major backend modules and integrations.",
      "Improve observability and runtime reliability.",
      "Collaborate with frontend and product teams.",
      "Guide engineering best practices.",
    ],
    requirements: [
      "5+ years of backend engineering experience.",
      "Deep Node.js and TypeScript expertise.",
      "Cloud and Docker/Kubernetes familiarity.",
      "Experience mentoring team members.",
    ],
  },
  {
    id: "job-6",
    title: "[Hue] Senior Back-end Supervisor",
    company: "Ban Vien Corporation",
    location: "Hue, Vietnam",
    postedAt: "2026-04-01T00:00:00Z",
    jobType: "Full-time",
    remoteOption: "on-site",
    badge: "good",
    description:
      "Lead backend team delivery, architecture reviews, and release quality for enterprise projects.",
    responsibilities: [
      "Break down technical roadmap into execution tasks.",
      "Review architecture and coding standards.",
      "Coach backend engineers and oversee delivery.",
      "Coordinate with PM and stakeholders.",
    ],
    requirements: [
      "7+ years of backend experience.",
      "Prior technical leadership role.",
      "Strong system design and communication skills.",
      "Experience in enterprise environments.",
    ],
  },
  {
    id: "job-7",
    title: "Full Stack Developer",
    company: "MGM Technology Partners Vietnam",
    location: "Da Nang City, Vietnam",
    postedAt: "2026-03-24T09:00:00Z",
    jobType: "Full-time",
    remoteOption: "hybrid",
    badge: "top",
    description:
      "Build fullstack products with modern JS stacks and collaborate in an agile product team.",
    responsibilities: [
      "Develop frontend and backend features.",
      "Integrate APIs and third-party services.",
      "Write tests and participate in QA cycles.",
      "Contribute to architecture discussions.",
    ],
    requirements: [
      "Strong JavaScript/TypeScript skills.",
      "Experience with React and Node.js.",
      "Understanding of CI/CD and Git flow.",
      "Proactive and ownership attitude.",
    ],
  },
  {
    id: "job-8",
    title: "Full Stack Engineer (Spring Boot)",
    company: "Headhunter",
    location: "Hanoi, Vietnam",
    postedAt: "2026-03-27T06:00:00Z",
    jobType: "Full-time",
    remoteOption: "on-site",
    badge: "good",
    description:
      "Develop scalable Spring Boot APIs and frontend modules for enterprise clients.",
    responsibilities: [
      "Implement Java backend services.",
      "Build and maintain React-based UI modules.",
      "Optimize performance and troubleshoot issues.",
      "Contribute to design reviews.",
    ],
    requirements: [
      "Spring Boot production experience.",
      "Frontend experience with React.",
      "Database and query optimization skills.",
      "Strong debugging capabilities.",
    ],
  },
  {
    id: "job-9",
    title: "Middle .NET Developer in Da Nang",
    company: "Rainscales",
    location: "Da Nang City, Vietnam",
    postedAt: "2026-03-25T05:00:00Z",
    jobType: "Full-time",
    remoteOption: "hybrid",
    badge: "good",
    description:
      "Work on modern .NET services with a product-oriented engineering team.",
    responsibilities: [
      "Build and maintain application services.",
      "Integrate with internal and external APIs.",
      "Write unit tests and support releases.",
      "Collaborate in agile ceremonies.",
    ],
    requirements: [
      "2+ years of .NET development.",
      "Solid SQL and API integration skills.",
      "Git and team collaboration experience.",
      "Good English communication.",
    ],
  },
  {
    id: "job-10",
    title: "Full-stack Middle",
    company: "Your.Rentals",
    location: "Hanoi, Vietnam",
    postedAt: "2026-03-22T01:00:00Z",
    jobType: "Full-time",
    remoteOption: "remote",
    badge: "good",
    description:
      "Develop and improve travel-tech product features with a distributed engineering team.",
    responsibilities: [
      "Implement fullstack product features.",
      "Collaborate with design and product teams.",
      "Improve application performance.",
      "Ensure test coverage for key flows.",
    ],
    requirements: [
      "Hands-on fullstack JavaScript experience.",
      "React and Node.js proficiency.",
      "Understanding of REST and auth flows.",
      "Ability to work asynchronously.",
    ],
  },
  {
    id: "job-11",
    title: "Lead Platform Engineer",
    company: "Confidential",
    location: "Remote, Vietnam",
    postedAt: "2026-04-12T10:00:00Z",
    jobType: "Full-time",
    remoteOption: "remote",
    badge: "good",
    description:
      "Own platform engineering initiatives to improve CI/CD, developer experience, and reliability.",
    responsibilities: [
      "Design platform standards and tooling.",
      "Automate infrastructure and deployment pipelines.",
      "Improve observability and incident response.",
      "Mentor teams on platform best practices.",
    ],
    requirements: [
      "Strong DevOps/platform background.",
      "Kubernetes and cloud-native experience.",
      "IaC familiarity (Terraform/Bicep).",
      "Excellent cross-team collaboration.",
    ],
  },
  {
    id: "job-12",
    title: "Principal Java Engineer",
    company: "Confidential",
    location: "Remote, APAC",
    postedAt: "2026-04-11T08:00:00Z",
    jobType: "Full-time",
    remoteOption: "remote",
    badge: "good",
    description:
      "Drive architecture and technical strategy for mission-critical Java services.",
    responsibilities: [
      "Lead architecture decisions for distributed systems.",
      "Set coding standards and technical direction.",
      "Collaborate with business and engineering leadership.",
      "Support high-impact delivery milestones.",
    ],
    requirements: [
      "8+ years with Java backend systems.",
      "Expertise in system design and scalability.",
      "Strong ownership and leadership mindset.",
      "Experience with cloud and performance tuning.",
    ],
  },
];
