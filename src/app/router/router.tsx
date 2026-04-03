import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root";
import {
  loginRoute,
  registerRoute,
  forgotPasswordRoute,
  homeRoute,
  dashboardRoute,
  resumeOptimizerRoute,
  jobsRoute,
  matchReportRoute,
  sampleReportRoute,
} from "./routes";

// Thêm homeRoute vào danh sách, bỏ todosRoute đi
const routeTree = rootRoute.addChildren([
  homeRoute, // <-- Trang chủ
  dashboardRoute,
  resumeOptimizerRoute,
  jobsRoute,
  matchReportRoute,
  sampleReportRoute,
  loginRoute,
  registerRoute,
  forgotPasswordRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
