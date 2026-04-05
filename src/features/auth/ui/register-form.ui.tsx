import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRegister } from "../model/register.model";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff, Star } from "lucide-react";
import { useState } from "react";
import { BRAND } from "@/shared/config/brand";

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export function RegisterForm() {
  const { register, error, loading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },

    validators: {
      onSubmit: ({ value }) => {
        const result = registerSchema.safeParse(value);

        if (!result.success) {
          return result.error.flatten().fieldErrors;
        }
      },
    },

    onSubmit: async ({ value }) => {
      await register(value);
    },
  });

  return (
    <main className="flex h-screen w-full bg-[#fcf9f8] [font-family:'Instrument_Sans',sans-serif] text-[#1c1b1b]">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0d0d0d] p-12 lg:flex">
        <div>
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            {BRAND.name}
          </Link>
        </div>

        <div className="max-w-md">
          <h1 className="mb-4 text-5xl font-bold leading-[1.1] tracking-tight text-white xl:text-6xl">
            Build a profile that gets noticed
          </h1>
          <p className="text-lg font-medium text-slate-400">
            Start your career journey with precision-crafted AI assistance.
          </p>
        </div>

        <div className="max-w-sm">
          <div className="mb-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                className="h-4 w-4 fill-[#0041c8] text-[#0041c8]"
              />
            ))}
          </div>
          <p className="text-sm italic font-medium leading-relaxed text-white/90">
            "The onboarding was smooth and the AI suggestions made my profile
            stronger in minutes."
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-500">
            Linh Tran - Frontend Developer
          </p>
        </div>

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full border border-white/5" />
      </section>

      <section className="flex w-full flex-col items-center justify-center bg-white px-6 py-12 lg:w-1/2 lg:px-24">
        <div className="w-full max-w-[400px]">
          <header className="mb-10 text-center lg:text-left">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-[#0d0d0d]">
              Create your account
            </h2>
            <p className="text-sm text-[#434656]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#0041c8] underline-offset-4 hover:underline"
              >
                Log in
              </Link>
            </p>
          </header>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="email">
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-bold uppercase tracking-widest text-[#434656]"
                  >
                    Email Address
                  </label>
                  <input
                    id={field.name}
                    type="email"
                    placeholder="name@company.com"
                    required
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3.5 text-sm transition-all placeholder:text-[#737688] focus:border-[#0d0d0d] focus:outline-none"
                  />
                  {field.state.meta.errors?.[0] && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="name">
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-bold uppercase tracking-widest text-[#434656]"
                  >
                    Full Name
                  </label>
                  <input
                    id={field.name}
                    type="text"
                    placeholder="Nguyen Van A"
                    required
                    value={field.state.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3.5 text-sm transition-all placeholder:text-[#737688] focus:border-[#0d0d0d] focus:outline-none"
                  />
                  {field.state.meta.errors?.[0] && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-bold uppercase tracking-widest text-[#434656]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                      className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3.5 pr-12 text-sm transition-all placeholder:text-[#737688] focus:border-[#0d0d0d] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737688] transition-colors hover:text-[#1c1b1b]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {field.state.meta.errors?.[0] && (
                    <p className="text-sm text-red-500">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                {typeof error === "string"
                  ? error
                  : error.message || "Registration failed. Please try again."}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#0041c8] py-4 text-sm font-bold tracking-wide text-white transition-opacity duration-150 hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e5e5e5]" />
            </div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest">
              <span className="bg-white px-4 text-[#737688]">
                or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                const googleAuthUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
                if (googleAuthUrl) {
                  window.location.href = googleAuthUrl;
                }
              }}
              className="flex items-center justify-center gap-3 rounded-xl border border-[#e5e5e5] py-3.5 transition-colors duration-150 hover:bg-[#f6f3f2] active:scale-[0.98]"
            >
              <span className="text-sm font-bold text-[#1c1b1b]">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-[#e5e5e5] py-3.5 transition-colors duration-150 hover:bg-[#f6f3f2] active:scale-[0.98]"
            >
              <span className="text-sm font-bold text-[#1c1b1b]">LinkedIn</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
