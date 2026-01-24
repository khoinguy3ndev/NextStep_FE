import { TOGGLE_TODO_STATUS_MUTATION } from '../mutation/toggle-todo-status.mutation';
import { useMutation } from "@apollo/client/react";

export interface ToggleTodoStatusResponse {
  updateTodoStatus: {
    todoId: number;
    completed: boolean;
    createdAt: string;    
  }
}

export const useToggleTodoStatusModel = () => {
  const [toggleStatus, { loading, error }] = useMutation<ToggleTodoStatusResponse, { todoId: number }>(TOGGLE_TODO_STATUS_MUTATION, {
    update(cache, { data }) {
      if (!data?.updateTodoStatus) return;

      const { todoId, completed } = data.updateTodoStatus;

      cache.modify({
        fields: {
          getTodos(existingTodos = [], { readField }) {
            return existingTodos.map((todo: any) => {
              const currentId = readField('todoId', todo);
              if (Number(currentId) === todoId) {
                return { ...todo, completed };
              }
              return todo;
            });
          },
        },
      });
    }
  }) 


  const toggleTodoStatus = async (todoId: number) => {
    const res = await toggleStatus({
      variables: { todoId },
    })

    return res.data?.updateTodoStatus;
  }

  return {
    toggleTodoStatus,
    loading,
    error,
  }
}