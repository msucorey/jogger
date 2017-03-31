const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const raceBanner = document.getElementById("game-race");
  const resetButton = document.getElementById("reset-button");
  const distanceRemaining = document.getElementById("distance-remaining");
  const messageConsole = document.getElementById("message-console");
  const rightPane = document.getElementById("right-pane");
  const music = document.getElementById("bkgd-music");
  const muteButton = document.getElementById("mute-button");
  const muteText = document.getElementById("mute-text");
  const modalText = document.getElementById("modal-text");
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();

  resetButton.addEventListener("click", resetGame);
  muteButton.addEventListener("click", mute);
  raceBanner.innerHTML = game.race;
  messageConsole.innerHTML = "Get ready to run!  Start with an easy 1-miler and then...LEVEL UP!!!";
  resetButton.innerHTML = "JOG!";
  setInterval(updateDisplay, 50);

  function resetGame() {
    rightPane.style.background = "yellow";
    if (game.status === "won") {
      levelUp();
      music.play();
      raceBanner.innerHTML = game.race;
      messageConsole.innerHTML = "Run!  Don't get hit by a bus!";
      resetButton.innerHTML = "RESET";
    } else {
      game.reset();
      music.play();
      raceBanner.innerHTML = game.race;
      messageConsole.innerHTML = "Run!  Don't get hit by a bus!";
      resetButton.innerHTML = "RESET";
    }
  }

  function levelUp() {
    game.advanceLevel();
  }

  function updateDisplay() {
    distanceRemaining.innerHTML = Math.round(1000* game.distanceRemaining) / 1000 + " mi.";
    if (game.status === "won") {
      rightPane.style.background = "green";
      messageConsole.innerHTML = "You won!";
      resetButton.innerHTML = "NEXT RACE!";
      music.pause();
    } else if (game.status === "lost") {
      rightPane.style.background = "red";
      messageConsole.innerHTML = "You lost!";
      resetButton.innerHTML = "PLAY AGAIN";
      music.pause();
    }
  }
  // Get the modal
  const modal = document.getElementById('myModal');
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  // When the user clicks on the button, open the modal
  function openModal() {
    modal.style.display = "block";
  }
  function mute() {
    music.muted = !music.muted;
    muteText.innerHTML = muteText.innerHTML === "MUTE" ? "UNMUTE" : "MUTE";
    muteButton.style.background = muteButton.style.background === "green" ? "red" : "green";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
