import { RouterProvider } from '@tanstack/react-router'
import { ApolloProvider } from '@apollo/client/react'
import { router } from './router'
import { apolloClient } from '@/shared/api/graphql/client'

export function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  )
}