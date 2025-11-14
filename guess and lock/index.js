 let secretNumber = "";
let isLocked = false;

// No DOMContentLoaded needed here
const lockBtn = document.getElementById("lockBtn");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const themeToggle = document.getElementById("themeToggle");

const secretInput = document.getElementById("secretInput");
const guessInput = document.getElementById("guessInput");
const guessSection = document.getElementById("guessSection");
const hintBox = document.getElementById("hint");
const resultMessage = document.getElementById("resultMessage");

// Lock secret number
lockBtn.addEventListener("click", () => {
  const input = secretInput.value.trim();
  if (input.length !== 4 || isNaN(input)) {
    alert("Please enter a valid 4-digit number.");
    return;
  }

  secretNumber = input;
  isLocked = true;

  secretInput.disabled = true;
  lockBtn.disabled = true;
  guessSection.classList.remove("hidden");
});

// Guessing logic
guessBtn.addEventListener("click", () => {
  const guess = guessInput.value.trim();

  if (guess.length !== 4 || isNaN(guess)) {
    resultMessage.textContent = "❗ Enter a valid 4-digit number.";
    resultMessage.className = "message lose";
    return;
  }

  if (guess === secretNumber) {
    resultMessage.textContent = "🎉 You Win!";
    resultMessage.className = "message win";
    hintBox.textContent = "";
  } else {
    let hint = "";
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secretNumber[i]) {
        hint += `✅ ${guess[i]} `;
      } else if (secretNumber.includes(guess[i])) {
        hint += `🔁 ${guess[i]} `;
      } else {
        hint += `❌ ${guess[i]} `;
      }
    }
    hintBox.textContent = "Hint: " + hint;
    resultMessage.textContent = "❌ Try Again!";
    resultMessage.className = "message lose";
  }
});

// Reset game
resetBtn.addEventListener("click", () => {
  secretNumber = "";
  isLocked = false;

  secretInput.value = "";
  secretInput.disabled = false;
  lockBtn.disabled = false;

  guessInput.value = "";
  hintBox.textContent = "";
  resultMessage.textContent = "";
  resultMessage.className = "message";

  guessSection.classList.add("hidden");
});

// Theme toggle logic
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
