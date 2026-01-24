import { storage } from "@/shared/lib/storage";

export function useSession() {
  const accessToken = storage.get('accessToken');

  const logout = () => {
    storage.remove('accessToken');
    storage.remove('refreshToken');
    location.href = '/login';
  }

  return {
    isAuthenticated: !!accessToken,
    logout,
  }
}