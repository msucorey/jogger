const Util = require("./util");

class Bus {
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
        this.pos = this.game.wrap(this.pos);
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

module.exports = Bus;
