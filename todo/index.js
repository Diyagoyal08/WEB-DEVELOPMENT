 console.log("INDEX LOADED");

import { load } from "./storage/localStorage.js";
import { setProjects } from "./models/projectsManager.js";
import { renderAll } from "./ui/renderToDos.js";

// Load data
const stored = load();
setProjects(stored);

// Render UI
renderAll();
