const Bus = require("./moving_object");
const Util = require("./util");

class Jogger extends Bus {
  constructor(options) {
    options.width = Jogger.WIDTH;
    options.length = Jogger.LENGTH;
    options.vel = options.vel || [0, 0];
    options.color = options.color;
    super(options);
  }

}

Jogger.WIDTH = 15;
Jogger.LENGTH = 15;
module.exports = Jogger;
