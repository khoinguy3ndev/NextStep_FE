import { HeroSection } from "./hero.section";
import { JobCategories } from "./categories.section";
import { AIResumeSection } from "./ai.section";
import { FeaturedJobs } from "./jobs.section";

export const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <JobCategories />
      <AIResumeSection />
      <FeaturedJobs />
    </div>
  );
};
