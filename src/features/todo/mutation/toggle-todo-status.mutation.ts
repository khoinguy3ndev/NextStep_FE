import { gql } from "@apollo/client";

export const TOGGLE_TODO_STATUS_MUTATION = gql`
  mutation UpdateStatus($todoId: Float!) {
    updateTodoStatus(todoId: $todoId) {
      todoId,
      completed,
      createdAt,
    }
  }
`