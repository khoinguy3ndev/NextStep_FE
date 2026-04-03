import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { storage } from "@/shared/lib/storage";

const httpLink = createHttpLink({
  uri: "http://localhost:3003/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Lấy token từ storage mà bạn đã lưu ở bước login
  const token = storage.get("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
