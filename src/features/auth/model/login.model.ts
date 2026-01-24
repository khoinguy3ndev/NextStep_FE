import { useMutation } from '@apollo/client/react';
import { LOGIN_MUTATION } from '../mutation/login.mutation';
import { storage } from '@/shared/lib/storage';
import { useNavigate } from '@tanstack/react-router';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  login: {
    accessToken: string;
    refreshToken: string;
  }
}

export function useLogin() {
  const navigate = useNavigate();

  const [loginMutation, { loading, error }] = useMutation<LoginResponse>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (!data?.login) return;

      const { accessToken, refreshToken } = data.login;
      storage.set('accessToken', accessToken);
      storage.set('refreshToken', refreshToken);
      navigate({ to: '/todos' });
    }
  })

  const login = async (loginInput: LoginInput) => {
    const res = await loginMutation({
      variables: { loginInput },
    })

    return res;
  }

  return {
    login,
    loading,
    error,
  }
}