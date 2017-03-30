const MovingObject = require("./moving_object");
const Util = require("./util");

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

Jogger.WIDTH = 15;
Jogger.LENGTH = 15;
module.exports = Jogger;
