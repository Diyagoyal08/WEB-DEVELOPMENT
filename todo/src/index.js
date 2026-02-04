import { createTodo } from "./logic/todo.js";
import {
  projects,
  getCurrentProject,
  setCurrentProject
} from "./logic/project.js";
import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "./storage/localStorage.js";
import { renderTodos } from "./ui/render.js";

const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const dueDateInput = document.querySelector("#dueDate");
const priorityInput = document.querySelector("#priority");
const addTodoBtn = document.querySelector("#addTodoBtn");
const todoList = document.querySelector("#todoList");
const projectList = document.querySelector(".project-list");
const projectTitle = document.querySelector(".todos-header h2");

addTodoBtn.addEventListener("click", () => {
  if (!titleInput.value.trim()) return;

  const newTodo = createTodo(
    titleInput.value,
    descriptionInput.value,
    dueDateInput.value,
    priorityInput.value
  );

  getCurrentProject().todos.push(newTodo);
  saveToLocalStorage(getCurrentProject().name);
  renderTodos(todoList);

  titleInput.value = "";
  descriptionInput.value = "";
  dueDateInput.value = "";
  priorityInput.value = "Low";
});

projectList.addEventListener("click", e => {
  if (e.target.tagName !== "LI") return;

  setCurrentProject(e.target.textContent);
  projectTitle.textContent = e.target.textContent;

  document.querySelectorAll(".project-list li")
    .forEach(li => li.classList.remove("active"));

  e.target.classList.add("active");

  renderTodos(todoList);
});

loadFromLocalStorage(setCurrentProject);
renderTodos(todoList);
