import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRegister } from "../model/register.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Link } from "@tanstack/react-router";

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export function RegisterForm() {
  const { register, error, loading } = useRegister();

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
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="flex gap-4 mb-8 w-full align-items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-medium">Đăng ký</h1>
          </div>
        </div>
      </div>

      <Card className="w-full max-w-sm flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Đăng ký tài khoản</CardTitle>
          <CardDescription>
            Nhập thông tin bên dưới để tạo tài khoản mới
          </CardDescription>
        </CardHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <CardContent>
            <div className="flex flex-col gap-6 mb-4">
              {/* Email Field */}
              <form.Field name="email">
                {(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-sm text-red-500">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Name Field */}
              <form.Field name="name">
                {(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Họ và tên</Label>
                    <Input
                      id={field.name}
                      type="text"
                      placeholder="Nguyễn Văn A"
                      required
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-sm text-red-500">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Password Field */}
              <form.Field name="password">
                {(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Mật khẩu</Label>
                    <Input
                      id={field.name}
                      type="password"
                      placeholder="••••••••"
                      required
                      value={field.state.value}
                      onChange={(e) => field.setValue(e.target.value)}
                    />
                    {field.state.meta.errors?.[0] && (
                      <p className="text-sm text-red-500">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* General error */}
              {error && (
                <div className="text-sm text-red-500">Đăng ký thất bại</div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Đang xử lý..." : "Đăng ký"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="font-semibold hover:underline">
                Đăng nhập ngay
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
