 // src/logic/todo.js
export function createTodo(
  title,
  description = "",
  dueDate = "",
  priority = "Low"
) {
  return {
    id: Date.now().toString(),
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
}

export function toggleTodo(todo) {
  todo.completed = !todo.completed;
}

export function updateTodo(todo, updates) {
  Object.assign(todo, updates);
}
