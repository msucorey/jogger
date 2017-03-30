const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const scoreBanner = document.getElementById("game-score");
  const resetButton = document.getElementById("reset-button");
  const distanceRemaining = document.getElementById("distance-remaining");
  const messageConsole = document.getElementById("message-console");

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();

  resetButton.addEventListener("click", resetGame);
  scoreBanner.innerHTML = game.score;
  distanceRemaining.innerHTML = 3.1;
  messageConsole.innerHTML = "Run!  Don't get hit by a bus!";
  setInterval(updateDisplay, 50);

  function resetGame() {
    game.reset();
  }

  function updateDisplay() {
    scoreBanner.innerHTML = game.score;
    distanceRemaining.innerHTML = Math.round(1000* game.distanceRemaining) / 1000;
    if (game.status === "won") {
      messageConsole.innerHTML = "You won!";
    } else if (game.status === "lost") {
      messageConsole.innerHTML = "You lost!";
    }
  }
});
