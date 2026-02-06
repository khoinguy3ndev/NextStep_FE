import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useLogin } from "../model/login.model";
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

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm() {
  const { login, error, loading } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: ({ value }) => {
        const result = loginSchema.safeParse(value);

        if (!result.success) {
          return result.error.flatten().fieldErrors;
        }
      },
    },

    onSubmit: async ({ value }) => {
      console.log("Submitting", value);
      await login(value);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className="flex gap-4 mb-8 w-full align-items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <h1 className="text-4xl font-medium">Đăng nhập</h1>
          </div>
        </div>
      </div>

      <Card className="w-full max-w-sm flex flex-col gap-6">
        <CardHeader>
          <CardTitle>Chào mừng trở lại</CardTitle>
          <CardDescription>
            Đăng nhập vào tài khoản của bạn để tiếp tục
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
              {/* Email */}
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

              {/* Password */}
              <form.Field name="password">
                {(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={field.name}>Mật khẩu</Label>
                    </div>
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
                    {/* Thêm: Link quên mật khẩu (Thiếu cái này là user hay hỏi lắm) */}
                    <div className="flex justify-end">
                      {/* <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-muted-foreground hover:underline outline-none"
                      >
                        Quên mật khẩu?
                      </Link> */}
                    </div>
                  </div>
                )}
              </form.Field>

              {/* General error */}
              {error && (
                <div className="text-sm text-red-500">Đăng nhập thất bại</div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              Đăng nhập
            </Button>

            {/* Thêm: Link chuyển qua trang đăng ký (Bắt buộc phải có) */}
            <div className="text-center text-sm text-gray-500">
              Bạn chưa có tài khoản?{" "}
              <Link to="/register" className="font-semibold hover:underline">
                Đăng ký
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
