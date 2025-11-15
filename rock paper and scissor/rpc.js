 function computerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
} 

function playerChoice() {
    let input = prompt("Enter rock, paper, or scissors:").toLowerCase();
    if (input !== 'rock' && input !== 'paper' && input !== 'scissors') {
        alert("Invalid choice! Please choose rock, paper, or scissors.");
        return playerChoice(); // retry
    }
    return input;
}

function determineWinner(player, computer) {
    if (player === computer) {
        return "It's a tie!";
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}

function playGame() {
    const player = playerChoice();
    const computer = computerChoice();
    const result = determineWinner(player, computer);
    alert(`You chose: ${player}\nComputer chose: ${computer}\n${result}`);
}

playGame();
