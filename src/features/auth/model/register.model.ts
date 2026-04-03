import { useMutation } from '@apollo/client/react';
import { REGISTER_MUTATION } from '../mutation/register.mutation';
import { useNavigate } from '@tanstack/react-router';

export interface RegisterInput {
  email: string;
  name: string;
  password: string;
}

export function useRegister() {
  const navigate = useNavigate();

  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data: any) => {
      console.log(data.register); 
      navigate({ to: '/login' });
    }
  })

  const register = (registerInput: RegisterInput) => {
    registerMutation({
      variables: { registerInput }
    })
  }

  return {
    register,
    loading,
    error,
  }
}
