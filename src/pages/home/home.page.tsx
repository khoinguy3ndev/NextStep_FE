import { HeaderWidget } from "@/widgets/header/header.widget";
import { Dashboard } from "@/widgets/dashboard";
import { Footer } from "@/widgets/footer/footer.widget";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWidget />
      <main className="container mx-auto py-8 px-4">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
