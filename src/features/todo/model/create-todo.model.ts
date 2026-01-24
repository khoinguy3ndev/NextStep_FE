import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { CREATE_TODO_MUTATION } from "../mutation/create-todo.mutation"

export interface CreateTodoInput {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface CreateTodoResponse {
  createTodo: {
    todoId: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    completed: boolean;
    createdAt: string;
  }
}

export const useCreateTodoModel = () => {
  const [createMutation, { loading, error }] = useMutation<
    CreateTodoResponse,
    { createTodoInput: CreateTodoInput }
    >(CREATE_TODO_MUTATION, {
      update(cache, { data }) {
        if (!data?.createTodo) return;

        cache.modify({
          fields: {
            getTodos(existingTodos = []) {
              const newTodoRef = cache.writeFragment({
                data: data.createTodo,
                fragment: gql`
                  fragment NewTodo on Todo {
                    todoId
                    title
                    description
                    startDate
                    endDate
                    completed
                    createdAt
                  }
                `
              });
              return [...existingTodos, newTodoRef];
            }
          }
        });
      }
    });

  const createTodo = async (createTodoInput: CreateTodoInput) => {
    const res = await createMutation({
      variables: { createTodoInput },
    })

    return res.data?.createTodo;
  }

  return {
    createTodo,
    loading,
    error,
  }
}

// {
//     "query": "mutation CreateTodo($createTodoInput: CreateTodoInput!) { createTodo(createTodoInput: $createTodoInput) { todoId, title, description, startDate, endDate, completed, createdAt } }",
//     "variables": {
//       "createTodoInput": {
//       "title": "Learn GraphQL",
//       "description": "Enouvo IT Solutions",
//       "startDate": "2026-01-15T08:00:00.000Z",
//       "endDate": "2026-01-16T08:00:00.000Z"
//       }
//     }
//   }
