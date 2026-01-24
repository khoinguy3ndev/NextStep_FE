import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query GetTodos {
    getTodos {
      todoId,
      title,
      description,
      startDate,
      endDate,
      completed,
      createdAt,
    }
  }
`

/**
 *
 *
 * CREATE TODO TESTING MUTATION
{
  "query": "mutation CreateTodo($createTodoInput: CreateTodoInput!) { createTodo(createTodoInput: $createTodoInput) { todoId, title, description, startDate, endDate, completed, createdAt, user { userId } } } ",
  "variables": {
    "createTodoInput": {
      "title": "Learn GraphQL",
      "description": "Enouvo IT Solutions",
      "startDate": "2026-01-15T08:00:00.000Z",
      "endDate": "2026-01-16T08:00:00.000Z"
    }
  }
}

  GET TODO BY ID TESTING QUERY
  {
    "query": "query GetTodo($todoId: Float!) { getTodoById(todoId: $todoId) { todoId, title, description, startDate, endDate, completed, createdAt, user { userId } } } ",
    "variables": {
      "todoId": 1
    }
  }

  {
    "query": "mutation UpdateStatus($todoId: Float!) { updateTodoStatus(todoId: $todoId) { todoId, completed, createdAt, user { userId } } } ",
    "variables": {
      "todoId": 3
    }
  }

 */