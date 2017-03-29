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

  run(input) {
  this.vel[0] += input[0];
  this.vel[1] += input[1];
  }

}

Jogger.WIDTH = 15;
Jogger.LENGTH = 15;
module.exports = Jogger;
