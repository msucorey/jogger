/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  // Find distance between two points.
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },
  wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.jogger = this.game.addJogger();
  }

  bindKeyHandlers() {
    const jogger = this.jogger;

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { jogger.run(move); });
    });

  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  "up": [ 0, -1],
  "left": [-1,  0],
  "down": [ 0,  1],
  "right": [ 1,  0],
};

module.exports = GameView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(3);
const Util = __webpack_require__(0);

class Jogger extends MovingObject {
  constructor(options) {
    options.width = Jogger.WIDTH;
    options.length = Jogger.LENGTH;
    options.vel = options.vel || [0, 0];
    options.color = options.color;
    options.isWrappable = true;
    super(options);
  }

  draw(ctx) {
    let img = new Image();
    img.src = "./images/jogger_icon.png";
    ctx.drawImage(img, this.pos[0], this.pos[1], this.width, this.length);

    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos[0], this.pos[1], this.width, this.length);
  }

  run(input) {
  this.vel[0] += input[0];
  this.vel[1] += input[1];
  }

}

Jogger.WIDTH = 25;
Jogger.LENGTH = 25;
module.exports = Jogger;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const Jogger = __webpack_require__(2);

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.width = options.width;
    this.length = options.length;
    this.speed = options.speed;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = options.isWrappable;
  }

  collideWith(otherObject) {
    if (otherObject.constructor.name == 'Jogger') {
      this.game.status = "lost";
    } else {
      otherObject.vel[0] *= -1;
      otherObject.vel[1] *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.length);
  }

  isCollidedWith(otherObject) {
    //do nothing
  }

  move(timeDelta) {
    //timeDelta is number of milliseconds since last move
    //if the computer is busy the time delta will be larger
    //in this case the MovingObject should move farther in this frame
    //velocity of object is how far it should move in 1/60th of a second
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        if (this.constructor.name == 'Jogger') {
          this.game.distanceRemaining += 0.5;
        }
        this.pos = this.game.wrap(this.pos);
        this.vel[0] *= 1.5;
        this.vel[1] *= 1.5;
        if (Math.abs(this.vel[0]) > MAX_VEL) {
          this.vel[0] *= 0.66;
        }
        if (Math.abs(this.vel[1]) > MAX_VEL) {
          this.vel[1] *= 0.66;
        }
      } else {
        this.remove();
      }
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;
const MAX_VEL = 10;

module.exports = MovingObject;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Jogger = __webpack_require__(2);
const Bus = __webpack_require__(6);
const Building = __webpack_require__(5);
const Util = __webpack_require__(0);
const GameView = __webpack_require__ (1);

class Game {
  constructor() {
    this.buses = [];
    this.buildings = [];
    this.joggers = [];
    this.score = 0;
    this.level = 0; //up to 8
    this.distanceRemaining = Game.DISTANCE[this.level];
    this.race = Game.RACE[this.level];
    this.pos = [160, 160];
    this.status = "start"; //or "won" or "lost"
    this.addBuses();
    this.addBuildings();
  }
  reset() {
    this.buses = [];
    this.buildings = [];
    this.joggers = [];
    this.score = 0;
    this.level = 1;
    this.distanceRemaining = Game.DISTANCE[this.level];
    this.race = Game.RACE[this.level];
    this.pos = [160, 160];
    this.status = "playing";
    this.addBuses();
    this.addBuildings();
    const jogger = this.addJogger();
    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { jogger.run(move); });
    });
  }
  advanceLevel() {
    this.buses = [];
    this.buildings = [];
    this.joggers = [];
    this.score = 0;
    this.level += 1;
    this.distanceRemaining = Game.DISTANCE[this.level];
    this.race = Game.RACE[this.level];
    this.pos = [160, 160];
    this.status = "playing";
    this.addBuses();
    this.addBuildings();
    const jogger = this.addJogger();
    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { jogger.run(move); });
    });
  }

  add(object) {
    if (object instanceof Bus) {
      this.buses.push(object);
    } else if (object instanceof Building) {
      this.buildings.push(object);
    } else if (object instanceof Jogger) {
      this.joggers.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  addBuses() {
    let bus1 = new Bus({
      pos: [100, 10],
      vel: [(1 * this.diffSpeed()) + 0.1, 0],
      color: "yellow",
      game: this
    });
    this.add(bus1);
    let bus2 = new Bus({
      pos: [440, 160],
      vel: [(-1 * this.diffSpeed()) - 0.1, 0],
      color: "yellow",
      game: this
    });
    this.add(bus2);
    let bus3 = new Bus({
      pos: [0, 310],
      vel: [(this.diffSpeed() + 0.1), 0],
      color: "yellow",
      game: this
    });
    this.add(bus3);
    let bus4 = new Bus({
      pos: [440, 460],
      vel: [(-1 * this.diffSpeed()) - 0.1, 0],
      color: "yellow",
      game: this
    });
    this.add(bus4);
    let bus5 = new Bus({
      pos: [10, 0],
      vel: [0, (1 * this.diffSpeed()) + 0.1],
      color: "yellow",
      game: this
    });
    this.add(bus5);
    let bus6 = new Bus({
      pos: [160, 440],
      vel: [0, (-1 * this.diffSpeed()) - 0.1],
      color: "yellow",
      game: this
    });
    this.add(bus6);
    let bus7 = new Bus({
      pos: [310, 0],
      vel: [0, (1 * this.diffSpeed()) + 0.1],
      color: "yellow",
      game: this
    });
    this.add(bus7);
    let bus8 = new Bus({
      pos: [460, 400],
      vel: [0, (-1 * this.diffSpeed()) - 0.1],
      color: "yellow",
      game: this
    });
    this.add(bus8);
  }

  addJogger() {
    const jogger = new Jogger({
      pos: [160, 160],
      vel: [0, 0],
      color: "white",
      game: this
    });
    this.add(jogger);
    return jogger;
  }

  addBuildings() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const building = new Building({
          pos: [50 + i * 150, 50 + j * 150],
          color: "orange",
          length: 100,
          width: 100,
          game: this
        });
        this.add(building);
      }
    }
  }

  diffSpeed() {
    return Math.random() * (1 + this.level / 10);
  }

  allObjects() {
    return [].concat(this.buses, this.buildings, this.joggers);
  }

  allObstacles() {
    return [].concat(this.buses, this.buildings);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    let img = new Image();
    img.src = "./images/asphalt.png";
    ctx.drawImage(img, 0, 0, Game.DIM_X, Game.DIM_Y);
    // ctx.fillStyle = Game.BG_COLOR;
    // ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.score += 1;
    if (this.score % 10 === 0) {
      let distance = Util.dist(this.pos, this.joggers[0].pos) / 1000;
      this.distanceRemaining -= distance;
      if (this.distanceRemaining < 0) {
        this.status = "won";
        this.distanceRemaining = 0;
      }
      this.pos = this.joggers[0].pos;
    }
    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    if (this.status === "playing") {
      this.allObjects().forEach((object) => {
        object.move(delta);
      });
    }
  }

  //TODO need function for jogger start position
  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  remove(object) {
    if (object instanceof Bus) {
      this.buses.splice(this.buses.indexOf(object), 1);
    } else if (object instanceof Building) {
      this.buildings.splice(this.buildings.indexOf(object), 1);
    } else if (object instanceof Jogger) {
      this.joggers.splice(this.joggers.indexOf(object), 1);
    } else {
      throw "unknown type of object";
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
    ];
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 500;
Game.DIM_Y = 500;
Game.FPS = 32;
Game.NUM_BUILDINGS = 9;
Game.DISTANCE = [1, 1, 2, 3.1, 5, 6.2, 10, 13.1, 26.2, 100];
Game.RACE = [
  "Your first race!",
  "1 miler",
  "2 miler",
  "5k!",
  "10k!!",
  "10 miler",
  "Half Marathon!",
  "Full Marathon!!",
  "100 miler!!!!!!!!!!"
];

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class Building {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.width = options.width;
    this.length = options.length;
    this.speed = options.speed;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = false;
  }

  collideWith(otherObject) {
    otherObject.vel[0] *= -0.5;
    otherObject.vel[1] *= -0.5;
  }

  draw(ctx) {
    let img = new Image();
    img.src = "./images/building_icons.png";
    ctx.drawImage(img, this.pos[0], this.pos[1], this.width, this.length);

    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos[0], this.pos[1], this.width, this.length);
  }

  isCollidedWith(otherObject) {
    let pos = this.pos;
    let width = this.width;
    let length = this.length;

    let upperLeftInside = (otherObject.pos[1] > pos[1]) && (otherObject.pos[1] < (pos[1] + length)) && (otherObject.pos[0] > pos[0]) && (otherObject.pos[0] < (pos[0] + width));
    let upperRightInside = (otherObject.pos[1] > pos[1]) && (otherObject.pos[1] < (pos[1] + length)) && ((otherObject.pos[0] + otherObject.width) > pos[0]) && (otherObject.pos[0] + otherObject.width < (pos[0] + width));
    let lowerLeftInside = ((otherObject.pos[1] + otherObject.length) > pos[1]) && ((otherObject.pos[1] + otherObject.length) < (pos[1] + length)) && (otherObject.pos[0] > pos[0]) && (otherObject.pos[0] < (pos[0] + width));
    let lowerRightInside = ((otherObject.pos[1] + otherObject.length) > pos[1]) && ((otherObject.pos[1] + otherObject.length) < (pos[1] + length)) && ((otherObject.pos[0] + otherObject.width) > pos[0]) && ((otherObject.pos[0] + otherObject.width) < (pos[0] + width));

    return upperLeftInside || upperRightInside || lowerLeftInside || lowerRightInside;
  }

  move(timeDelta) {
    //Buildings don't move!
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = Building;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(3);
const Util = __webpack_require__(0);

class Bus extends MovingObject {
  constructor(options) {
    options.width = Bus.WIDTH;
    options.length = Bus.LENGTH;
    options.vel = options.vel || [0, 0];
    options.color = options.color;
    options.isWrappable = true;
    super(options);
  }

  draw(ctx) {
    let img = new Image();
    img.src = "./images/bus_icon.png";
    ctx.drawImage(img, this.pos[0], this.pos[1], this.width, this.length);

    // ctx.fillStyle = this.color;
    // ctx.fillRect(this.pos[0], this.pos[1], this.width, this.length);
    }

  isCollidedWith(otherObject) {
    let pos = this.pos;
    let width = this.width;
    let length = this.length;

    let upperLeftInside = (otherObject.pos[1] > pos[1]) && (otherObject.pos[1] < (pos[1] + length)) && (otherObject.pos[0] > pos[0]) && (otherObject.pos[0] < (pos[0] + width));
    let upperRightInside = (otherObject.pos[1] > pos[1]) && (otherObject.pos[1] < (pos[1] + length)) && ((otherObject.pos[0] + otherObject.width) > pos[0]) && (otherObject.pos[0] + otherObject.width < (pos[0] + width));
    let lowerLeftInside = ((otherObject.pos[1] + otherObject.length) > pos[1]) && ((otherObject.pos[1] + otherObject.length) < (pos[1] + length)) && (otherObject.pos[0] > pos[0]) && (otherObject.pos[0] < (pos[0] + width));
    let lowerRightInside = ((otherObject.pos[1] + otherObject.length) > pos[1]) && ((otherObject.pos[1] + otherObject.length) < (pos[1] + length)) && ((otherObject.pos[0] + otherObject.width) > pos[0]) && ((otherObject.pos[0] + otherObject.width) < (pos[0] + width));

    return upperLeftInside || upperRightInside || lowerLeftInside || lowerRightInside;
  }

}

Bus.WIDTH = 30;
Bus.LENGTH = 30;
module.exports = Bus;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);
const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const raceBanner = document.getElementById("game-race");
  const resetButton = document.getElementById("reset-button");
  const distanceRemaining = document.getElementById("distance-remaining");
  const messageConsole = document.getElementById("message-console");
  const rightPane = document.getElementById("right-pane");
  const modalText = document.getElementById("modal-text");
  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  new GameView(game, ctx).start();

  resetButton.addEventListener("click", resetGame);
  raceBanner.innerHTML = game.race;
  messageConsole.innerHTML = "Get ready to run!  Start with an easy 1-miler and then...LEVEL UP!!!";
  resetButton.innerHTML = "JOG!";
  setInterval(updateDisplay, 50);

  function resetGame() {
    rightPane.style.background = "yellow";
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
      rightPane.style.background = "green";
      messageConsole.innerHTML = "You won!";
      resetButton.innerHTML = "NEXT RACE!";
    } else if (game.status === "lost") {
      rightPane.style.background = "red";
      messageConsole.innerHTML = "You lost!";
      resetButton.innerHTML = "PLAY AGAIN";
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map