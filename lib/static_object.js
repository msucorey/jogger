const Util = require("./util");

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
    // default do nothing
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.pos[0], this.pos[1], this.width, this.length);
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.width + otherObject.width);
  }

  move(timeDelta) {
    //Buildings don't move!
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = Building;
