// Select all cells
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const resetBtn = document.querySelector("#reset");

let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Start game
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);

function handleCellClick(e) {
    const cell = e.target;

    // Stop if filled or game finished
    if (cell.textContent !== "" || !gameActive) return;

    // Set current player's symbol
    cell.textContent = currentPlayer;

    // Check win or draw
    if (checkWin()) {
        statusText.textContent = `${currentPlayer} wins! 🎉`;
        gameActive = false;
    } else if (isDraw()) {
        statusText.textContent = "It's a Draw! 😐";
        gameActive = false;
    } else {
        // Switch turn
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winPatterns.some(pattern =>
        pattern.every(index =>
            cells[index].textContent === currentPlayer
        )
    );
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function resetGame() {
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "X's Turn";
}
