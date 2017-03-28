const Jogger = require("./jogger");
const Bus = require("./moving_object");
const Building = require("./static_object");
const Util = require("./util");

class Game {
  constructor() {
    this.buses = [];
    this.buildings = [];
    this.joggers = [];

    this.addBus();
    this.addBuilding();
    this.addJogger();
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

  addBus() {
    const bus = new Bus({
      pos: [0, 0],
      game: this
    });
    this.add(bus);
    return bus;
  }

  addJogger() {
    const jogger = new Jogger({
      pos: [225, 225],
      game: this
    });
    this.add(jogger);
    return jogger;
  }

  addBuilding() {
    const building = new Building({
      pos: [50, 50],
      game: this
    });
    this.add(building);
    return building;
  }

  allObjects() {
    return [].concat(this.buses, this.buildings, this.joggers);
  }

  checkSplatter() {
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
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  moveObjects(delta) {
    this.allObjects().forEach((object) => {
      object.move(delta);
    });
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
Game.DIM_X = 650;
Game.DIM_Y = 650;
Game.FPS = 32;
Game.NUM_BUILDINGS = 9;

module.exports = Game;
