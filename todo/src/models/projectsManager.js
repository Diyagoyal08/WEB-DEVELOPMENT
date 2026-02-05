 export const projects = [
  {name:"Inbox", todos:[]},
  {name:"College", todos:[]},
  {name:"Personal", todos:[]}
];

export let currentProject="Inbox";

export function setCurrentProject(name){
  currentProject=name;
}

export function getCurrentProject(){
  return projects.find(p=>p.name===currentProject);
}