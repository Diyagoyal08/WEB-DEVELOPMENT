import { getCurrentProject } from "../logic/project.js";
import { saveToLocalStorage } from "../storage/localStorage.js";

export function renderTodos(todoList) {
  todoList.innerHTML = "";

  const project = getCurrentProject();

  project.todos.forEach(todo => {
    const card = document.createElement("div");
    card.classList.add("todo-card", todo.priority.toLowerCase());
    if (todo.completed) card.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      todo.completed = checkbox.checked;
      saveToLocalStorage(project.name);
      renderTodos(todoList);
    });

    const main = document.createElement("div");
    main.classList.add("todo-main");

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const date = document.createElement("span");
    date.textContent = `Due: ${todo.dueDate || "No date"}`;

    main.append(title, date);

    const priority = document.createElement("span");
    priority.classList.add("priority");
    priority.textContent = todo.priority;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      const index = project.todos.findIndex(t => t.id === todo.id);
      project.todos.splice(index, 1);
      saveToLocalStorage(project.name);
      renderTodos(todoList);
    });

    card.append(checkbox, main, priority, deleteBtn);
    todoList.appendChild(card);
  });
}
