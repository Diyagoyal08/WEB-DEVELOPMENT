 export function createTodo(
  title,
  description = "",
  dueDate = "",
  priority = "low"
) {
  return {
    id: crypto.randomUUID(),
    title,
    description,
    dueDate,
    priority,
    completed: false,
  };
}
