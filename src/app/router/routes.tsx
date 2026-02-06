import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

// Import các trang
import { LoginPage } from "@/pages/login/login.page";
import { RegisterPage } from "@/pages/register/register.page";
import { HomePage } from "@/pages/home/home.page"; // <-- Import trang Home mới

// 1. Route Login
export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// 2. Route Register
export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

// 3. Route Home (Thay thế cho todosRoute)
export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/", // Chạy ngay ở trang chủ
  component: HomePage,
});
