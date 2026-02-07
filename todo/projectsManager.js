 import { createTodo } from "./todoFactory.js";

let projects = [];
let currentProject = null;

// ---------- DEFAULT DATA ----------
function defaultProjects() {
  return [
    {
      name: "Inbox",
      todos: [
        createTodo("Welcome Task", "This is your first todo", "", "Low"),
        createTodo("Click checkbox", "Try completing a task", "", "Medium"),
      ],
    },
    {
      name: "College",
      todos: [
        createTodo("Finish Assignment", "Web dev work", "", "High"),
      ],
    },
  ];
}

// ---------- INIT ----------
export function setProjects(data) {
  if (!data || data.length === 0) {
    projects = defaultProjects();
  } else {
    projects = data;
  }
  currentProject = projects[0].name;
}

export function getProjects() {
  return projects;
}

export function getCurrentProject() {
  return projects.find((p) => p.name === currentProject);
}

export function setCurrentProject(name) {
  currentProject = name;
}

// ---------- ACTIONS ----------
export function addProject(name) {
  if (!name.trim()) return;

  projects.push({
    name,
    todos: [],
  });
}

export function addTodo(todo) {
  getCurrentProject().todos.push(todo);
}

export function deleteTodo(id) {
  const project = getCurrentProject();
  project.todos = project.todos.filter((t) => t.id !== id);
}

export function toggleTodo(id) {
  const todo = getCurrentProject().todos.find((t) => t.id === id);
  todo.completed = !todo.completed;
}
