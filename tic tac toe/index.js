 // -------------------- State --------------------
let board = ["", "", "", "", "", "", "", "", ""];
let buttons = document.querySelectorAll(".field");
let playerSymbol = "X";
let currentPlayer = "X";

const modeSelect = document.querySelector("#levels");
const restartButton = document.querySelector(".restart");
const xButton = document.querySelector(".btn-p.x");
const oButton = document.querySelector(".btn-p.o");

let gameMode = modeSelect.value;

// Result display
const winnerText = document.querySelector(".winner");
const xText = document.querySelector(".x-text");
const oText = document.querySelector(".o-text");
const drawText = document.querySelector(".winner.draw");

// Win combos
const winCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// -------------------- Player Choose --------------------
xButton.onclick = () => { playerSymbol = "X"; currentPlayer = "X"; };
oButton.onclick = () => { playerSymbol = "O"; currentPlayer = "O"; };

// -------------------- Helpers --------------------
function getEmptyIndexes() {
  return board.map((v,i) => v === "" ? i : null).filter(v => v !== null);
}

function checkWin() {
  for (let c of winCombinations) {
    const [a,b,c2] = c;
    if (board[a] && board[a] === board[b] && board[a] === board[c2]) {
      return board[a];
    }
  }
  return null;
}

function checkDraw() {
  return board.every(c => c !== "") && !checkWin();
}

function disableBoard() {
  buttons.forEach(b => b.disabled = true);
}

function enableBoard() {
  buttons.forEach(b => b.disabled = false);
}

function showWinner(sym) {
  winnerText.classList.remove("hide");
  if (sym === "X") xText.classList.remove("hide");
  if (sym === "O") oText.classList.remove("hide");
}

function showDraw() {
  drawText.classList.remove("hide");
}

function clearResult() {
  winnerText.classList.add("hide");
  xText.classList.add("hide");
  oText.classList.add("hide");
  drawText.classList.add("hide");
}

// -------------------- AI Logic --------------------

// Easy: random
function aiEasy() {
  const empty = getEmptyIndexes();
  return empty[Math.floor(Math.random() * empty.length)];
}

// Medium: win or block else random
function aiMedium() {
  // win
  for (let i of getEmptyIndexes()) {
    board[i] = currentPlayer;
    if (checkWin()) { board[i] = ""; return i; }
    board[i] = "";
  }

  // block
  const human = currentPlayer === "X" ? "O" : "X";
  for (let i of getEmptyIndexes()) {
    board[i] = human;
    if (checkWin()) { board[i] = ""; return i; }
    board[i] = "";
  }

  return aiEasy();
}

// Hard (Minimax)
function minimax(newBoard, isMaximizing) {
  const winner = checkWin();
  if (winner === "X") return -10;
  if (winner === "O") return 10;
  if (checkDraw()) return 0;

  const empty = getEmptyIndexes();
  if (isMaximizing) {
    let best = -Infinity;
    for (let i of empty) {
      newBoard[i] = "O";
      best = Math.max(best, minimax(newBoard, false));
      newBoard[i] = "";
    }
    return best;
  } else {
    let best = Infinity;
    for (let i of empty) {
      newBoard[i] = "X";
      best = Math.min(best, minimax(newBoard, true));
      newBoard[i] = "";
    }
    return best;
  }
}

function aiHard() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i of getEmptyIndexes()) {
    board[i] = currentPlayer;
    let score = minimax(board, false);
    board[i] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
  return bestMove;
}

// -------------------- AI Move --------------------
function aiMove() {
  let move;

  if (gameMode === "easy") move = aiEasy();
  else if (gameMode === "medium") move = aiMedium();
  else move = aiHard();

  board[move] = currentPlayer;
  buttons[move].querySelector("p").textContent = currentPlayer;

  const w = checkWin();
  if (w) { showWinner(w); disableBoard(); return; }

  if (checkDraw()) { showDraw(); disableBoard(); return; }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// -------------------- Click Handling --------------------
buttons.forEach((button, index) => {
  button.onclick = () => {
    if (board[index] !== "") return;

    board[index] = currentPlayer;
    button.querySelector("p").textContent = currentPlayer;

    const w = checkWin();
    if (w) { showWinner(w); disableBoard(); return; }

    if (checkDraw()) { showDraw(); disableBoard(); return; }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (gameMode !== "vs friend") {
      setTimeout(aiMove, 300);
    }
  };
});

// -------------------- Restart --------------------
function restartGame() {
  board = ["","","","","","","","",""];
  buttons.forEach(b => b.querySelector("p").textContent = "");
  currentPlayer = playerSymbol;
  enableBoard();
  clearResult();
}

restartButton.onclick = restartGame;

modeSelect.onchange = () => {
  gameMode = modeSelect.value;
  restartGame();
};
