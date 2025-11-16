const list = document.querySelector("ul");
const input = document.querySelector("input");
const button = document.querySelector("button");
const userchoice = document.getElementById("user-choice");
const computerchoice = document.getElementById("computer-choice");
const resultdisplay = document.getElementById("result");
const choices = document.querySelectorAll("button");
button.addEventListener("click", (event) => {
  event.preventDefault();

  const myItem = input.value;
  input.value = "";

  const listItem = document.createElement("li");
  const listText = document.createElement("span");
  const listBtn = document.createElement("button");

  listItem.appendChild(listText);
  listText.textContent = myItem;
  listItem.appendChild(listBtn);
  listBtn.textContent = "Delete";
  list.appendChild(listItem);

  listBtn.addEventListener("click", () => {
    list.removeChild(listItem);
  });

  input.focus();
});