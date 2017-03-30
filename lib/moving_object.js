const Util = require("./util");
const Jogger = require("./jogger");

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
          this.game.distanceRemaining += 0.65;
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
