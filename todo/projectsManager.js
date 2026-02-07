 import { createTodo } from "./todoFactory.js";

let projects = [];
let currentProjectName = null;

/* ---------- DEFAULT DATA ---------- */
function defaultProjects() {
  return [
    {
      name: "Inbox",
      todos: [
        createTodo("Welcome Task", "This is your first todo", "", "low"),
        createTodo("Click checkbox", "Try completing a task", "", "medium"),
      ],
    },
    {
      name: "College",
      todos: [
        createTodo("Finish Assignment", "Web dev work", "", "high"),
      ],
    },
  ];
}

/* ---------- INIT ---------- */
export function setProjects(data) {
  if (!Array.isArray(data) || data.length === 0) {
    projects = defaultProjects();
  } else {
    projects = data;
  }

  currentProjectName = projects[0]?.name || null;
}

export function getProjects() {
  return projects;
}

export function getCurrentProject() {
  return projects.find((p) => p.name === currentProjectName) || null;
}

export function setCurrentProject(name) {
  if (projects.some((p) => p.name === name)) {
    currentProjectName = name;
  }
}

/* ---------- ACTIONS ---------- */
export function addProject(name) {
  if (!name || !name.trim()) return;

  const project = {
    name: name.trim(),
    todos: [],
  };

  projects.push(project);
  currentProjectName = project.name;
}

export function addTodo(todo) {
  const project = getCurrentProject();
  if (!project) return;

  project.todos.push(todo);
}

export function deleteTodo(id) {
  const project = getCurrentProject();
  if (!project) return;

  project.todos = project.todos.filter((t) => t.id !== id);
}

export function toggleTodo(id) {
  const project = getCurrentProject();
  if (!project) return;

  const todo = project.todos.find((t) => t.id === id);
  if (!todo) return;

  todo.completed = !todo.completed;
}
