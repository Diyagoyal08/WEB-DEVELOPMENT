 import { createTodo } from "./models/todoFactory.js";
import { projects,getCurrentProject,setCurrentProject } from "./models/projectManager.js";
import { saveProjects,loadProjects } from "./storage/localStorage.js";
import { renderTodos } from "./ui/renderToDos.js";

/* DOM */
const title=document.querySelector("#title");
const desc=document.querySelector("#description");
const date=document.querySelector("#dueDate");
const priority=document.querySelector("#priority");
const btn=document.querySelector("#addTodoBtn");
const projectList=document.querySelector(".project-list");
const projectTitle=document.querySelector("#projectTitle");

/* Load storage */
loadProjects(projects);
renderTodos();

/* Add todo */
btn.addEventListener("click",()=>{
  if(!title.value.trim()) return;

  const todo=createTodo(
    title.value,
    desc.value,
    date.value,
    priority.value
  );

  getCurrentProject().todos.push(todo);
  saveProjects(projects);
  renderTodos();

  title.value="";
  desc.value="";
  date.value="";
});

/* Switch projects */
projectList.addEventListener("click",(e)=>{
  if(e.target.tagName!=="LI") return;

  setCurrentProject(e.target.textContent);
  projectTitle.textContent=e.target.textContent;

  document.querySelectorAll("li")
    .forEach(li=>li.classList.remove("active"));

  e.target.classList.add("active");

  renderTodos();
});
