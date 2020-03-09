const playerHand = document.querySelector(".player-hand");
const playerOptions = document.querySelectorAll(".options button");
const computerHand = document.querySelector(".computer-hand");
const computerOptions = ["rock", "paper", "scissors"];

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

//start the game by fading in and out to exchange the UI
function startGame() {
  const playBtn = document.querySelector(".intro button");
  const introScreen = document.querySelector(".intro");
  const match = document.querySelector(".match");

  playBtn.addEventListener("click", () => {
    introScreen.classList.add("fadeOut");
    match.classList.add("fadeIn");
    restartBtn.style.display = "block";
  });
}
startGame();

playerOptions.forEach(option => {
  option.addEventListener("click", getChoice);
});

function getChoice() {
  //setTimeout, the comparing should be triggered after handShaking animation 1.5s
  setTimeout(() => {
    const playerChoice = this.textContent;
    const randNumber = Math.floor(Math.random() * 3);
    const computerChoice = computerOptions[randNumber];
    const whoIsWinner = getWinner(playerChoice, computerChoice);

    //check the game logic
    console.log(playerChoice, computerChoice, whoIsWinner);

    //update the hand image
    playerHand.src = `images/${this.textContent}.png`;
    computerHand.src = `images/${computerChoice}.png`;
  }, 1500);

  //hands shaking animation
  playerHand.style.animation = "shakePlayer 1.5s ease";
  computerHand.style.animation = "shakeComputer 1.5s ease";
}

//cancel the animation once it ends
hands.forEach(hand => {
  hand.addEventListener("animationend", function() {
    this.style.animation = "none";
  });
});

function getWinner(p, c) {
  //update the scores
  function updateScore() {
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  }

  //check for tie
  if (p === c) {
    winnerMsg.textContent = "It's a tie";
    winnerMsg.style.color = "#444";
    return "tie";
  }

  //check for rock
  if (p === "rock") {
    if (c === "scissors") {
      winnerMsg.textContent = "You win";
      winnerMsg.style.color = "#66bfbf";
      pScore++;
      updateScore();
      return "You win";
    } else {
      winnerMsg.textContent = "Computer wins";
      winnerMsg.style.color = "#f76b8a";
      cScore++;
      updateScore();
      return "Computer wins";
    }
  }

  //check for paper
  if (p === "paper") {
    if (c === "scissors") {
      winnerMsg.textContent = "Computer wins";
      winnerMsg.style.color = "#f76b8a";
      cScore++;
      updateScore();
      return "Computer wins";
    } else {
      winnerMsg.textContent = "You win";
      winnerMsg.style.color = "#66bfbf";
      pScore++;
      updateScore();
      return "You win";
    }
  }

  //check for scissors
  if (p === "scissors") {
    if (c === "rock") {
      winnerMsg.textContent = "Computer wins";
      winnerMsg.style.color = "#f76b8a";
      cScore++;
      updateScore();
      return "Computer wins";
    } else {
      winnerMsg.textContent = "You win";
      winnerMsg.style.color = "#66bfbf";
      pScore++;
      updateScore();
      return "You win";
    }
  }
}

restartBtn.addEventListener("click", restartGame);
function restartGame() {
  pScore = 0;
  cScore = 0;
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  winnerMsg.textContent = "choose an option";
  winnerMsg.style.color = "#66bfbf";
}

//add btn click sound effect
btnAll.forEach(btnSingle => {
  btnSingle.addEventListener("click", () => {
    btnClickSound.play();
  });
});
