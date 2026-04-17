import {
  clearSessionTokens,
  getAccessToken,
} from "@/shared/lib/storage";

export function useSession() {
  const accessToken = getAccessToken();

  const logout = () => {
    clearSessionTokens();
    location.href = "/";
  };

  return {
    isAuthenticated: !!accessToken,
    logout,
  };
}
