import { projects } from "../logic/project.js";

export function saveToLocalStorage(currentProject) {
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("currentProject", currentProject);
}

export function loadFromLocalStorage(setCurrentProject) {
  const storedProjects = localStorage.getItem("projects");
  const storedCurrent = localStorage.getItem("currentProject");

  if (storedProjects) {
    const parsed = JSON.parse(storedProjects);
    projects.length = 0;
    parsed.forEach(p => projects.push(p));
  }

  if (storedCurrent) {
    setCurrentProject(storedCurrent);
  }
}
