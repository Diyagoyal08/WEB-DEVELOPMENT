 import {
  getProjects,
  getCurrentProject,
  setCurrentProject,
  addProject,
  addTodo,
  deleteTodo,
  toggleTodo,
} from "../models/projectsManager.js";

import { createTodo } from "../models/todoFactory.js";
import { save } from "../storage/localStorage.js";

// ---------- ELEMENTS ----------
const projectList = document.querySelector("#projectList");
const todoList = document.querySelector("#todoList");
const projectTitle = document.querySelector("#projectTitle");

const addTaskBtn = document.querySelector("#addTodoBtn");
const addProjectBtn = document.querySelector("#newProjectBtn");

const todoForm = document.querySelector("#todoForm");

const titleInput = document.querySelector("#title");
const descInput = document.querySelector("#desc");
const dateInput = document.querySelector("#date");
const priorityInput = document.querySelector("#priority");

// ---------- PROJECT RENDER ----------
export function renderProjects() {
  projectList.innerHTML = "";

  getProjects().forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;

    li.onclick = () => {
      setCurrentProject(project.name);
      renderAll();
    };

    projectList.appendChild(li);
  });
}

// ---------- TODO RENDER ----------
export function renderTodos() {
  const project = getCurrentProject();

  projectTitle.textContent = project.name;
  todoList.innerHTML = "";

  project.todos.forEach((todo) => {
    const card = document.createElement("div");
    card.className = `todo-item priority-${todo.priority}`;

    if (todo.completed) card.classList.add("completed");

    const text = document.createElement("div");
    text.className = "todo-content";
    text.innerHTML = `
        <h3>${todo.title}</h3>
        <span class="due-date">${todo.dueDate || ""}</span>
    `;

    const badge = document.createElement("span");
    badge.className = "priority-badge";
    badge.textContent = todo.priority;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.onclick = () => {
      toggleTodo(todo.id);
      renderAll();
    };

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.textContent = "Delete";
    del.onclick = () => {
      deleteTodo(todo.id);
      renderAll();
    };

    card.append(checkbox, text, badge, del);
    todoList.appendChild(card);
  });
}

// ---------- FORM SUBMIT ----------
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

// ---------- NEW PROJECT ----------
addProjectBtn.onclick = () => {
  const name = prompt("Project name?");
  if (!name) return;

  addProject(name);
  renderAll();
};

// ---------- MASTER RENDER ----------
export function renderAll() {
  renderProjects();
  renderTodos();
  save(getProjects());
}
