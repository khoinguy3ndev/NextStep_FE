import { createRoute } from '@tanstack/react-router'

import { LoginPage } from '@/pages/login/login.page'
import { RegisterPage } from '@/pages/register/register.page'
import { rootRoute } from './root'
import { TodosPage } from '@/pages/todos/todos.page'

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
})

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
})

export const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/todos',
  component: TodosPage,
})