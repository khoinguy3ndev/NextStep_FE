import { TodoItem } from "@/entities/todo/ui/todo-item.ui";
import { useTodosModel } from "@/entities/todo/model/get-todos.model";
import { useToggleTodoStatusModel } from "@/features/todo/model/toggle-todo-status.model";

export function TodoList() {
  const { todos, loading, error } = useTodosModel();
  const { toggleTodoStatus } = useToggleTodoStatusModel();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-6">
      {/* TO DO Section */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground uppercase">
          To Do ({ activeTodos.length })
        </p>
        <div className="space-y-3">
          {activeTodos.length > 0 ? (
            activeTodos.map((todo) => (
              <TodoItem
                key={todo.todoId}
                todo={todo}
                onToggle={(id) => toggleTodoStatus(id)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">No tasks to do.</p>
          )}
        </div>
      </div>

      {/* COMPLETED Section */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground uppercase">
          Completed ({completedTodos.length})
        </p>
        <div className="space-y-3">
          {completedTodos.length > 0 ? (
            completedTodos.map((todo) => (
              <TodoItem
                key={todo.todoId}
                todo={todo}
                onToggle={(id) => toggleTodoStatus(id)}
              />
            ))
          ) : (
            <p className="text-sm text-gray-400">No completed tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
}
