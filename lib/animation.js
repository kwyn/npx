var npx = require('../');
var util = require('util');
function StripAnimation (stripLength, frames) {
  this.buffer = new Buffer(stripLength*3);
}

StripAnimation.prototype.setPixel = function(first_argument) {

};