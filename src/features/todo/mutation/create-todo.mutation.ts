import { gql } from "@apollo/client";

export const CREATE_TODO_MUTATION = gql`
  mutation CreateTodo($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      todoId
      title
      description
      startDate
      endDate
      completed
      createdAt
    }
  }
`