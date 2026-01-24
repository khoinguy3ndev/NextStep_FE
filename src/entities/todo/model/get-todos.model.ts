import { useQuery } from "@apollo/client/react";
import { GET_TODOS } from "../query/todo.queries";
import type { Todo } from "../types/todo.types";

interface GetTodosResponse {
  getTodos: Todo[];
}

export const useTodosModel = () => {
  const { data, loading, error } = useQuery<GetTodosResponse>(GET_TODOS);

  return {
    todos: data?.getTodos ?? [],
    loading,
    error,
  };
};