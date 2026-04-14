import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { storage } from "@/shared/lib/storage";

export function GoogleCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      storage.set("access_token", token);
      storage.set("accessToken", token);
      navigate({ to: "/dashboard" });
      return;
    }

    navigate({ to: "/login" });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground [font-family:'Instrument_Sans',sans-serif]">
      <p className="text-base font-medium">Dang dang nhap...</p>
    </div>
  );
}
