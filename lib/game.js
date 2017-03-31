const Jogger = require("./jogger");
const Bus = require("./bus");
const Building = require("./building");
const Util = require("./util");
const GameView = require ("./game_view");

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
