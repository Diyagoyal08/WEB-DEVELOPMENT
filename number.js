document.addEventListener("DOMContentLoaded", () => {
  const guessInput = document.querySelector("#guessInput");
  const checkBtn = document.querySelector(".check-btn");
  const message = document.querySelector("#message");
  const attemptsDisplay = document.querySelector(".stats span:nth-child(1) b");
  const bestScoreDisplay = document.querySelector(".stats span:nth-child(2) b");
  const resetBtn = document.querySelector(".reset-btn");

  if (!guessInput || !checkBtn || !message || !attemptsDisplay || !bestScoreDisplay || !resetBtn) {
    console.error("number.js: required DOM elements missing");
    return;
  }

  let secretNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  const maxAttempts = 10;

  // load best score (stored as number), show '--' when none
  const rawBest = localStorage.getItem("bestScore");
  let bestScore = null;
  if (rawBest !== null) {
    const n = Number(rawBest);
    if (!Number.isNaN(n)) bestScore = n;
  }
  bestScoreDisplay.textContent = bestScore !== null ? bestScore : "--";

  attemptsDisplay.textContent = attempts;

  // Press ENTER to check
  guessInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      checkBtn.click();
    }
  });

  checkBtn.addEventListener("click", () => {
    const guessRaw = guessInput.value.trim();
    const guess = Number(guessRaw);

    // clear input after each check (as requested)
    guessInput.value = "";

    // validation
    if (guessRaw === "" || Number.isNaN(guess) || !Number.isFinite(guess) || guess < 1 || guess > 100) {
      message.textContent = "⛔ Enter a valid number (1-100)";
      guessInput.focus();
      return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    // If guess is correct
    if (guess === secretNumber) {
      const xp = attempts * 10;
      message.textContent = `🎉 Correct! The number was ${secretNumber}. You earned ${xp} XP.`;
      // Save best score (store highest XP)
      if (bestScore === null || xp > bestScore) {
        bestScore = xp;
        bestScoreDisplay.textContent = bestScore;
        try { localStorage.setItem("bestScore", String(bestScore)); } catch (err) { /* ignore */ }
      }
      disableGame();
      return;
    }

    // If guess is wrong
    message.textContent = guess > secretNumber ? "📉 Too High!" : "📈 Too Low!";

    // If attempts exceed limit → Game Over
    if (attempts >= maxAttempts) {
      message.textContent = `❌ Out of attempts! The number was ${secretNumber}. You earned 0 XP 😞`;
      disableGame();
    }

    // focus input for next attempt
    guessInput.focus();
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
    try { document.body.style.background = "linear-gradient(135deg, #0d1b2a, #1b263b, #2b2d42)"; } catch {}
    guessInput.focus();
    // debug
    console.debug("New secret:", secretNumber);
  });
});
