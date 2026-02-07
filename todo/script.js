const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');


addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
if (e.key === 'Enter') addTodo();
});


function addTodo() {
const text = input.value.trim();
if (!text) return;


const li = document.createElement('li');
li.innerHTML = `
<span>${text}</span>
<div class="actions">
<button class="done">✔</button>
<button class="delete">✖</button>
</div>
`;


li.querySelector('.done').onclick = () => li.classList.toggle('completed');
li.querySelector('.delete').onclick = () => li.remove();


list.appendChild(li);
input.value = '';
}