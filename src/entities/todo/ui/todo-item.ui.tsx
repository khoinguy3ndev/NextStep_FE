import { type Todo } from '../types/todo.types';

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
}

export function TodoItem({ todo, onToggle }: Props) {
  return (
    <div 
      className="flex items-center gap-3 rounded-lg border px-4 py-3 bg-white"
      title={`Deadline: ${new Date(todo.endDate).toLocaleDateString()}`}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Toggling todo:', todo.todoId);
          onToggle(Number(todo.todoId));
        }}
        className={`h-5 w-5 rounded-full border flex items-center justify-center cursor-pointer
          ${todo.completed ? "bg-black border-black" : "border-gray-300"}
        `}
      >
        {todo.completed && (
          <span className="h-2 w-2 rounded-full bg-white" />
        )}
      </button>

      <div className="flex flex-col">
        <p
          className={`text-sm font-medium ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p className="text-xs text-gray-500 mt-0.5">
            {todo.description}
          </p>
        )}
      </div>
    </div>
  );
}
