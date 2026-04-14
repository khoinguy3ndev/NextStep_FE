import { storage } from "@/shared/lib/storage";

export function useSession() {
  const accessToken = storage.get("accessToken");

  const logout = () => {
    storage.remove("accessToken");
    storage.remove("access_token");
    storage.remove("refreshToken");
    location.href = "/";
  };

  return {
    isAuthenticated: !!accessToken,
    logout,
  };
}
