import { HeaderWidget } from "@/widgets/header/header.widget";
import { TodoList } from "@/widgets/todo-list/todo-list.widget";
import { CreateTodoForm } from "@/features/todo/ui/create-todo-form.ui";

export function TodosPage() {
  return (
    <>
      {/* Spacer cho fixed header */}
      <div className="h-16" />
      <HeaderWidget />

      <main className="mx-auto max-w-[800px] px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">My Todos</h1>
          <p className="text-gray-700">Stay organized and track your tasks</p>
        </div>

        <div className="mb-8">
          <CreateTodoForm />
        </div>

        <div className="space-y-8">
          <TodoList />
        </div>
      </main>
    </>
  );
}
