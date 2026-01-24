import { createRouter } from '@tanstack/react-router'
import { rootRoute } from './root'
import { loginRoute, registerRoute, todosRoute } from './routes'

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  todosRoute
])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}