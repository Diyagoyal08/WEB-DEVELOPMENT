 import { getCurrentProject } from "../models/projectManager.js";
import { saveProjects } from "../storage/localStorage.js";
import { projects } from "../models/projectManager.js";

export function renderTodos(){
  const list=document.querySelector("#todoList");
  list.innerHTML="";

  const project=getCurrentProject();

  project.todos.forEach(todo=>{
    const card=document.createElement("div");
    card.classList.add("todo-card",todo.priority.toLowerCase());
    if(todo.completed) card.classList.add("completed");

    const title=document.createElement("span");
    title.textContent=todo.title;

    const priority=document.createElement("span");
    priority.classList.add("priority");
    priority.textContent=todo.priority;

    const check=document.createElement("input");
    check.type="checkbox";
    check.checked=todo.completed;

    check.addEventListener("change",()=>{
      todo.completed=check.checked;
      saveProjects(projects);
      renderTodos();
    });

    const del=document.createElement("button");
    del.textContent="Delete";
    del.classList.add("delete-btn");

    del.addEventListener("click",()=>{
      project.todos=project.todos.filter(t=>t.id!==todo.id);
      saveProjects(projects);
      renderTodos();
    });

    card.append(check,title,priority,del);
    list.appendChild(card);
  });
}
