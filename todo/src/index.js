 console.log("Step 3: JS loaded");

// Select important DOM elements
const addTodoBtn = document.querySelector(".add-todo-btn");
const addProjectBtn = document.querySelector(".add-project-btn");

console.log(addTodoBtn);
console.log(addProjectBtn);
 addTodoBtn.addEventListener("click", () => {
  console.log("Add Todo button clicked");
});

addProjectBtn.addEventListener("click", () => {
  console.log("Add Project button clicked");
});

// ----- Todo Data Logic -----

function createTodo(title, dueDate, priority) {
  return {
    id: Date.now(),       // unique id
    title: title,
    dueDate: dueDate,
    priority: priority,
    completed: false,
  };
}
let todos = [];
const testTodo = createTodo(
  "Learn JavaScript",
  "2026-02-10",
  "High"
);

todos.push(testTodo);

console.log(todos);
