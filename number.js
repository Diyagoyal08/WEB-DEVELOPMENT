 document.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.querySelector("#guessInput");
  const checkBtn = document.querySelector(".check-btn");
  const message = document.querySelector("#message");
  const attemptsDisplay = document.querySelector(".stats span:nth-child(1) b");
  const bestScoreDisplay = document.querySelector(".stats span:nth-child(2) b");
  const resetBtn = document.querySelector(".reset-btn");

  let secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  let maxAttempts = 10;
  let bestScore = localStorage.getItem("bestScore") || "--";

  attemptsDisplay.textContent = attempts;
  bestScoreDisplay.textContent = bestScore;

  // ✅ Press ENTER to check
  guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkBtn.click();
    }
  });

  checkBtn.addEventListener("click", () => {
    const guess = Number(guessInput.value);

    if (!guess || guess < 1 || guess > 100) {
      message.textContent = "⛔ Enter a valid number (1-100)";
      return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    // ✅ If guess is correct
    if (guess === secretNumber) {
      message.textContent = `🎉 Correct! The number was ${secretNumber}`;
      document.body.style.background = "linear-gradient(135deg, #003b15, #005f2f, #1ea04c)";

      // 🏆 Save Best Score
      if (bestScore === "--" || attempts < bestScore) {
        bestScore = attempts;
        bestScoreDisplay.textContent = bestScore;
        localStorage.setItem("bestScore", bestScore);
      }

      disableGame();
      return;
    }

    // ✅ If guess is wrong
    message.textContent = guess > secretNumber ? "📉 Too High!" : "📈 Too Low!";

    // ❌ If attempts exceed limit → Game Over
    if (attempts >= maxAttempts) {
      message.textContent = `❌ Out of attempts! The number was ${secretNumber}.  
You earned **0 XP** 😞`;
      disableGame();
    }
  });

  function disableGame() {
    guessInput.disabled = true;
    checkBtn.disabled = true;
  }

  resetBtn.addEventListener("click", () => {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    message.textContent = "Start guessing!";
    guessInput.value = "";
    guessInput.disabled = false;
    checkBtn.disabled = false;
    document.body.style.background = "linear-gradient(135deg, #0d1b2a, #1b263b, #2b2d42)";
  });
});
