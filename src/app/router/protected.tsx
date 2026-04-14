import { useSession } from "@/features/auth/session/session.model";
import { Navigate } from "@tanstack/react-router";
import type React from "react";

export function Protected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
