 console.log("INDEX LOADED");

import { loadProjects } from "./localStorage.js";
import { setProjects } from "./projectsManager.js";
import { renderAll } from "./renderTodos.js";

/* ---------- APP INIT ---------- */

// Load saved data
const storedProjects = loadProjects();
setProjects(storedProjects);

// Initial render
renderAll();
