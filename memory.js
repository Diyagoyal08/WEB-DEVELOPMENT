 const board = document.getElementById("game-board");
const startBtn = document.getElementById("start-btn");
const movesDisplay = document.getElementById("moves");
const result = document.getElementById("result");
const xpBar = document.getElementById("xp-bar");
const xpBtn = document.getElementById("xp-btn");
const totalXpDisplay = document.getElementById("total-xp");

let cards = [];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let totalXP = parseInt(localStorage.getItem("totalXP")) || 0;
let isChecking = false;
let gameStarted = false;

const icons = ["🍎", "🍌", "🍇", "🍓", "🍉", "🍒", "🍍", "🥝"];
totalXpDisplay.textContent = totalXP;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = "";
  const shuffled = shuffle([...icons, ...icons]);
  shuffled.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function startGame() {
  resetGame();
  gameStarted = true;
  createBoard();
}

function resetGame() {
  moves = 0;
  matchedCount = 0;
  flippedCards = [];
  isChecking = false;
  result.classList.add("hidden");
  xpBar.style.width = "0%";
  movesDisplay.textContent = "0";
}

function flipCard(card) {
  if (!gameStarted || isChecking) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.icon;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    movesDisplay.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  isChecking = true;
  const [card1, card2] = flippedCards;

  if (card1.dataset.icon === card2.dataset.icon) {
    setTimeout(() => {
      card1.classList.add("matched");
      card2.classList.add("matched");
      flippedCards = [];
      matchedCount += 2;
      isChecking = false;

      if (matchedCount === icons.length * 2) {
        endGame(true);
      }
    }, 400);
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "?";
      card2.textContent = "?";
      flippedCards = [];
      isChecking = false;
    }, 800);
  }
}

function calculateXP() {
  let xp = 0;
  if (moves <= 10) xp = 100;
  else if (moves <= 14) xp = 80;
  else if (moves <= 18) xp = 60;
  else if (moves <= 25) xp = 40;
  else xp = 20;
  return xp;
}

function endGame(won) {
  gameStarted = false;
  if (won) {
    const earnedXP = calculateXP();
    totalXP += earnedXP;
    localStorage.setItem("totalXP", totalXP);
    totalXpDisplay.textContent = totalXP;

    xpBar.style.width = `${earnedXP}%`;
    xpBar.style.transition = "width 1s ease-in-out";

 
    result.classList.remove("hidden");

    // Pulse animation for visual feedback
    xpBar.animate([{ transform: "scale(1)" }, { transform: "scale(1.1)" }, { transform: "scale(1)" }], {
      duration: 600,
      iterations: 1
    });
  }
}

// Reset total XP on double click
xpBtn.addEventListener("dblclick", () => {
  if (confirm("Reset total XP?")) {
    totalXP = 0;
    localStorage.setItem("totalXP", "0");
    totalXpDisplay.textContent = "0";
    xpBar.style.width = "0%";
  }
});

startBtn.addEventListener("click", startGame);
