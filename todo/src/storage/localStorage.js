 export function saveProjects(projects){
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function loadProjects(projects){
  const data=localStorage.getItem("projects");
  if(!data) return;

  const parsed=JSON.parse(data);
  projects.length=0;
  parsed.forEach(p=>projects.push(p));
}
