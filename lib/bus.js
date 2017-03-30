const MovingObject = require("./moving_object");
const Util = require("./util");

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
