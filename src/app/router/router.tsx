import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { loginRoute, registerRoute, homeRoute, jobsRoute } from "./routes";

// Thêm homeRoute vào danh sách, bỏ todosRoute đi
const routeTree = rootRoute.addChildren([
  homeRoute, // <-- Trang chủ
  loginRoute,
  registerRoute,
  jobsRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
