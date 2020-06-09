const playerHand = document.querySelector(".player-hand");
const playerOptions = document.querySelectorAll(".options button");
const computerHand = document.querySelector(".computer-hand");
const btnAll = document.querySelectorAll("button");
const btnClickSound = document.querySelector("audio.btn-click");

//set the initial score both to 0
let pScore = 0;
let cScore = 0;
const playerScore = document.querySelector(".player-score p");
const computerScore = document.querySelector(".computer-score p");
const winnerMsg = document.querySelector(".winner-msg");
const restartBtn = document.querySelector(".restart-btn");
const hands = document.querySelectorAll(".hands img");

const playBtn = document.querySelector(".intro button");
const introScreen = document.querySelector(".intro");
const match = document.querySelector(".match");
let gameIsRunning = false;

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const RESULT_TIE = "TIE";
const RESULT_PLAYER_WINS = "PLAYER WINS";
const RESULT_COMPUTER_WINS = "COMPUTER WINS";

const getPlayerChoice = (e) => {
  const choice = e.target.textContent;
  return choice;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice) => {
  if (cChoice === pChoice) {
    return RESULT_TIE;
  } else if (
    (cChoice === ROCK && pChoice === PAPER) ||
    (cChoice === PAPER && pChoice === SCISSORS) ||
    (cChoice === SCISSORS && pChoice === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else {
    return RESULT_COMPUTER_WINS;
  }
};

function updateScore() {
  playerScore.textContent = pScore;
  computerScore.textContent = cScore;
}

//start the game by fading in and out to exchange the UI
playBtn.addEventListener("click", () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  introScreen.classList.add("fadeOut");
  match.classList.add("fadeIn");
  restartBtn.style.display = "block";
});

playerOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    //setTimeout, the comparing should be triggered after handShaking animation 1.5s
    setTimeout(() => {
      const playerChoice = getPlayerChoice(e);
      const computerChoice = getComputerChoice();
      const winner = getWinner(computerChoice, playerChoice);
      console.log(playerChoice, computerChoice, winner);

      playerHand.src = `images/${playerChoice}.png`;
      computerHand.src = `images/${computerChoice}.png`;

      if (winner === RESULT_TIE) {
        winnerMsg.textContent = "It's a tie";
        winnerMsg.style.color = "#444";
      } else if (winner === RESULT_PLAYER_WINS) {
        winnerMsg.textContent = "You win";
        winnerMsg.style.color = "#66bfbf";
        pScore++;
        updateScore();
      } else {
        winnerMsg.textContent = "Computer wins";
        winnerMsg.style.color = "#f76b8a";
        cScore++;
        updateScore();
      }
    }, 1500);

    playerHand.style.animation = "shakePlayer 1.5s ease";
    computerHand.style.animation = "shakeComputer 1.5s ease";
  });
});

//cancel the animation once it ends
hands.forEach((hand) => {
  hand.addEventListener("animationend", function () {
    this.style.animation = "none";
  });
});

//restart the game
restartBtn.addEventListener("click", () => {
  pScore = 0;
  cScore = 0;
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  winnerMsg.textContent = "choose an option";
  winnerMsg.style.color = "#66bfbf";
});

//add btn click sound effect
btnAll.forEach((btnSingle) => {
  btnSingle.addEventListener("click", () => {
    btnClickSound.play();
  });
});
