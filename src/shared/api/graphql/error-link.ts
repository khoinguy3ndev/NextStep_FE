import { CombinedGraphQLErrors } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { clearSessionTokens } from "@/shared/lib/storage";

let hasHandledUnauthenticatedError = false;

const AUTH_ERROR_MESSAGES = [
  "Invalid token",
  "No token provided",
  "jwt expired",
  "User not found",
] as const;

function redirectToLogin() {
  if (typeof window === "undefined") return;
  if (window.location.pathname === "/login") return;

  window.location.replace("/login");
}

export const errorLink = onError(({ error }) => {
  const hasUnauthenticatedError = CombinedGraphQLErrors.is(error)
    ? error.errors.some((graphQLError) => {
        const code = graphQLError.extensions?.code;
        const message = graphQLError.message ?? "";

        return (
          code === "UNAUTHENTICATED" ||
          code === 401 ||
          AUTH_ERROR_MESSAGES.some((authMessage) =>
            message.includes(authMessage),
          )
        );
      })
    : false;

  if (hasUnauthenticatedError && !hasHandledUnauthenticatedError) {
    hasHandledUnauthenticatedError = true;
    clearSessionTokens();
    redirectToLogin();
    return;
  }

  if (error && !hasUnauthenticatedError) {
    console.error("GraphQL error", error);
  }
});
