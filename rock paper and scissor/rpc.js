// Get DOM elements
const rockbtn = document.getElementById("rock"); 
const paperbtn = document.getElementById("paper"); 
const scissorsbtn = document.getElementById("scissors");
const userdisplay = document.getElementById("user-choice");
const computedisplay = document.getElementById("computer-choice");
const resultdisplay = document.getElementById("result");
const startbtn = document.getElementById("start-btn");
const choices = document.querySelector(".choices");
const results = document.querySelector(".results");

 // Hide game area until start
choices.style.display = "none";
results.style.display = "none";

// Start button
startbtn.addEventListener("click", () => {
    choices.style.display = "block";
    results.style.display = "block";
});

// computer choice function
 function computerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    return options [ Math.floor(Math.random() * options.length) ];

} 

 

// determine winner function

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
       return  "Computer wins!";
    }
}


function playGame(player) {
     const computer = computerChoice(); 

    userdisplay.textContent = `You chose: ${player}`;
    computedisplay.textContent = `Computer chose: ${computer}`;
    resultdisplay.textContent = `result: ${determineWinner(player, computer)}`;
     
}
 
rockbtn.addEventListener("click", () => playGame('rock'));
paperbtn.addEventListener("click", () => playGame('paper'));
scissorsbtn.addEventListener("click", () => playGame('scissors'));
