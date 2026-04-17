import { useMutation } from '@apollo/client/react';
import { REGISTER_MUTATION } from '../mutation/register.mutation';
import { useNavigate } from '@tanstack/react-router';

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

interface RegisterResponse {
  register: string;
}

export function useRegister() {
  const navigate = useNavigate();

  const [registerMutation, { loading, error }] = useMutation<RegisterResponse>(
    REGISTER_MUTATION,
    {
      onCompleted: () => {
      navigate({ to: '/login' });
      },
    },
  )

  const register = async (registerInput: RegisterInput) => {
    return registerMutation({
      variables: { registerInput },
    })
  }

  return {
    register,
    loading,
    error,
  }
}
