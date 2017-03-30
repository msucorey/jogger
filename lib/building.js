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
    otherObject.vel[0] *= -0.9;
    otherObject.vel[1] *= -0.9;
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
