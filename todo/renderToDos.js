 import {
  getProjects,
  getCurrentProject,
  setCurrentProject,
  addProject,
  addTodo,
  deleteTodo,
  toggleTodo,
} from "./projectsManager.js";

import { createTodo } from "./todoFactory.js";
import { saveProjects } from "./localStorage.js";

/* ---------- ELEMENTS ---------- */
const projectList = document.querySelector("#projectList");
const todoList = document.querySelector("#todoList");
const projectTitle = document.querySelector("#projectTitle");

const addProjectBtn = document.querySelector("#addProjectBtn");
const todoForm = document.querySelector("#todoForm");

const titleInput = document.querySelector("#title");
const descInput = document.querySelector("#description");
const dateInput = document.querySelector("#dueDate");
const priorityInput = document.querySelector("#priority");

/* ---------- PROJECT RENDER ---------- */
export function renderProjects() {
  projectList.innerHTML = "";

  getProjects().forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;

    if (getCurrentProject()?.name === project.name) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      setCurrentProject(project.name);
      renderAll();
    });

    projectList.appendChild(li);
  });
}

/* ---------- TODO RENDER ---------- */
export function renderTodos() {
  const project = getCurrentProject();
  if (!project) return;

  projectTitle.textContent = project.name;
  todoList.innerHTML = "";

  project.todos.forEach((todo) => {
    const card = document.createElement("div");
    card.classList.add("todo-card", todo.priority);

    if (todo.completed) {
      card.classList.add("completed");
    }

    const main = document.createElement("div");
    main.className = "todo-main";

    const title = document.createElement("h3");
    title.textContent = todo.title;

    const dueDate = document.createElement("span");
    dueDate.className = "due-date";
    dueDate.textContent = todo.dueDate || "";

    main.append(title, dueDate);

    const priority = document.createElement("span");
    priority.className = "priority";
    priority.textContent = todo.priority;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      toggleTodo(todo.id);
      renderAll();
    });

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      deleteTodo(todo.id);
      renderAll();
    });

    card.append(checkbox, main, priority, delBtn);
    todoList.appendChild(card);
  });
}

/* ---------- FORM SUBMIT ---------- */
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!titleInput.value.trim()) return;

  const todo = createTodo(
    titleInput.value,
    descInput.value,
    dateInput.value,
    priorityInput.value
  );

  addTodo(todo);
  todoForm.reset();
  renderAll();
});

/* ---------- NEW PROJECT ---------- */
addProjectBtn.addEventListener("click", () => {
  const name = prompt("Project name?");
  if (!name) return;

  addProject(name);
  renderAll();
});

/* ---------- MASTER RENDER ---------- */
export function renderAll() {
  renderProjects();
  renderTodos();
  saveProjects(getProjects());
}
