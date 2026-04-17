# Frontend Fix Checklist

## In Progress

- [x] Remove duplicate `ApolloProvider` usage and keep a single app-level provider.
- [x] Move GraphQL endpoint configuration to Vite env instead of hardcoding it.
- [x] Wire Apollo auth error handling to clear session and recover safely on unauthenticated responses.
- [x] Centralize auth storage keys and logout behavior.
- [x] Tighten auth mutation typing and remove avoidable `any`.
- [x] Repair the highest-impact visible text and encoding issues in user-facing screens.
- [x] Remove obviously unused frontend files/components that are no longer part of the current app flow.
- [x] Fix the broken TypeScript and build configuration issues blocking production builds.

## Remaining Product Follow-ups

- [ ] Replace mock job/scan data flows with backend-backed queries and mutations.
- [ ] Implement a real forgot-password API flow.
- [ ] Add refresh-token handling if the backend supports it.
- [ ] Consolidate duplicated job filtering logic shared by dashboard and jobs pages.
