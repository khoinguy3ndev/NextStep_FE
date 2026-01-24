Design a production-ready Todo App UI and initialize a React + TypeScript codebase.

PROJECT CONTEXT
- This is a learning project with a real backend already implemented.
- Backend: NestJS + GraphQL + JWT (access & refresh token)
- Core features required: Login, Create Todo, List Todo
- The UI should be clean, modern, and minimal (not flashy, not marketing-style).

TECH STACK (must use all)
- React + TypeScript
- TailwindCSS
- shadcn/ui for base UI components
- TanStack Router for routing
- TanStack Form + Zod for form handling & validation
- Apollo Client for GraphQL
- GraphQL Code Generator (@graphql-codegen) for typed queries & mutations

FUNCTIONAL REQUIREMENTS
1. Authentication
   - Login page with email + password
   - Form validation using TanStack Form + Zod
   - After successful login, store accessToken and redirect to Todo page
   - Handle loading & error states clearly

2. Todo
   - Todo list page (protected route)
   - Display list of todos from GraphQL
   - Create todo form (title input + submit button)
   - Toggle status of todo
   - Optimistic UI update when creating todo
   - Basic empty state UI when no todos exist

**Queries:** - healthCheck: Kiểm tra server. - user(userId): Lấy thông tin user. - getTodoById(todoId): Lấy chi tiết Todo. 
**Mutations:** - register(registerInput): Đăng ký. - login(loginInput): Đăng nhập. - refreshToken(refreshToken): Lấy token mới khi token cũ hết hạn. - createTodo(createTodoInput): Tạo công việc mới. - updateTodoStatus(todoId): Cập nhật trạng thái todo.

ROUTING
- /login → Login page
- /todos → Todo list page (protected)

ARCHITECTURE (IMPORTANT)
- The source code MUST follow Feature-Sliced Design (FSD) principles
- Use CUSTOM FSD LAYERS with clear responsibilities:

  src/
  ├── app/          # App initialization, providers, router, global styles
  ├── processes/    # Cross-feature flows (e.g. auth session restore)
  ├── pages/        # Route-level pages (login, todos)
  ├── widgets/      # Large UI blocks composed from features
  ├── features/     # User actions (login, create-todo)
  ├── entities/     # Business domains (user, todo)
  └── shared/       # Shared UI, GraphQL client, utils, config

ARCHITECTURE RULES
- Pages MUST NOT call GraphQL directly
- GraphQL queries/mutations live in entities or features only
- Forms logic lives in features
- Widgets compose features but contain no business logic
- Shared layer contains no domain logic

GRAPHQL
- Assume GraphQL Playground exists at /graphql
- Use Apollo Client with auth header support
- Prepare codegen config and typed hooks usage

UI STYLE
- Clean, developer-focused UI
- Use shadcn components (Button, Input, Card, Form)
- Responsive but desktop-first
- No dashboard charts, no Kanban, just simple Todo

OUTPUT EXPECTATION
- Generate UI screens (Login, Todo List)
- Generate initial React source structure following FSD
- Code should be readable, scalable, and production-oriented



	"message": "Type 'Validator<unknown, ZodType<any, ZodTypeDef, any>>' has no properties in common with type 'FormValidators<{ email: string; password: string; }, FormValidateOrFn<{ email: string; password: string; }> | undefined, FormValidateOrFn<{ email: string; password: string; }> | undefined, ... 6 more ..., FormAsyncValidateOrFn<...> | undefined>'.


	"message": "Type 'ZodObject<{ email: ZodString; password: ZodString; }, \"strip\", ZodTypeAny, { email: string; password: string; }, { email: string; password: string; }>' has no properties in common with type 'Params'.",
