// src/logic/projectsManager.js
import { createProject } from "./project.js";

const projects = [];
let currentProjectId = null;

function initDefaultProject() {
  if (projects.length === 0) {
    const inbox = createProject("Inbox");
    projects.push(inbox);
    currentProjectId = inbox.id;
  }
}

function getProjects() {
  return projects;
}

function addProject(name) {
  const project = createProject(name);
  projects.push(project);
  return project;
}

function setCurrentProject(id) {
  currentProjectId = id;
}

function getCurrentProject() {
  return projects.find((p) => p.id === currentProjectId);
}

export {
  initDefaultProject,
  getProjects,
  addProject,
  setCurrentProject,
  getCurrentProject,
};
