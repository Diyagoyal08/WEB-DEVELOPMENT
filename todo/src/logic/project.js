 // src/logic/project.js
export function createProject(name) {
  return {
    id: Date.now().toString(),
    name,
    todos: [],
  };
}

export function addTodoToProject(project, todo) {
  project.todos.push(todo);
}

export function deleteTodoFromProject(project, todoId) {
  project.todos = project.todos.filter((t) => t.id !== todoId);
}

export function getTodoById(project, todoId) {
  return project.todos.find((t) => t.id === todoId);
}
