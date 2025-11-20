 let input = document.getElementById("inputbox");
let buttons = document.querySelectorAll("button");

let string = "";

// Find the current number (after last operator)
function getCurrentNumber(str) {
  let parts = str.split(/[\+\-\*\/%]/); 
  return parts[parts.length - 1];
}

// Handle both keyboard & button input
function handleInput(value) {

  if (value === "=") {
    try {
      string = eval(string).toString();
      input.value = string;
    } catch {
      input.value = "Error";
      string = "";
    }
  }

  else if (value === "AC") {
    string = "";
    input.value = "";
  }

  else if (value === "DEL") {
    string = string.slice(0, -1);
    input.value = string;
  }

  else if (value === ".") {
    let current = getCurrentNumber(string);
    if (!current.includes(".")) {   // allow only one decimal per number
      string += ".";
      input.value = string;
    }
  }

  else {
    string += value;
    input.value = string;
  }
}


// BUTTON INPUTS
buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    handleInput(e.target.innerHTML);
  });
});


// KEYBOARD SUPPORT
document.addEventListener("keydown", function (e) {
  let key = e.key;

  if (!isNaN(key)) handleInput(key);                        // numbers
  else if (["+", "-", "*", "/", "%"].includes(key)) handleInput(key); // operators
  else if (key === "Enter" || key === "=") handleInput("=");          // equals
  else if (key === ".") handleInput(".");                             
  else if (key === "Backspace") handleInput("DEL");         
  else if (key === "Delete" || key === "Escape") handleInput("AC");
});
