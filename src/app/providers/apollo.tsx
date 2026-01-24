import { apolloClient } from '@/shared/api/graphql/client';
import { ApolloProvider } from "@apollo/client/react";
import { type ReactNode } from "react";

interface ApolloAppProviderProps {
  children: ReactNode;
}

export function ApolloAppProvider({ children }: ApolloAppProviderProps) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  )
}