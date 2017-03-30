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

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();

  resetButton.addEventListener("click", resetGame);
  raceBanner.innerHTML = game.race;
  messageConsole.innerHTML = "Get ready to run!  Start with an easy 1-miler and then...LEVEL UP!!!";
  resetButton.innerHTML = "JOG!";
  setInterval(updateDisplay, 50);

  function resetGame() {
    if (game.status === "won") {
      levelUp();
      raceBanner.innerHTML = game.race;
      messageConsole.innerHTML = "Run!  Don't get hit by a bus!";
      resetButton.innerHTML = "RESET";
    } else {
      game.reset();
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
      messageConsole.innerHTML = "You won!";
      resetButton.innerHTML = "NEXT RACE!";
    } else if (game.status === "lost") {
      messageConsole.innerHTML = "You lost!";
      resetButton.innerHTML = "PLAY AGAIN";
    }
  }
  // Get the modal
  const modal = document.getElementById('myModal');

  // Get the button that opens the modal
  const btn = document.getElementById("title");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };

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
