import { HeaderWidget } from "@/widgets/header/header.widget";
import { Footer } from "@/widgets/footer/footer.widget";
import { RegisterForm } from "@/features/auth/ui/register-form.ui";

export function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWidget />
      <div className="h-screen flex items-center justify-center">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
}
