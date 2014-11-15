var utils = require('./utils');

// Basically a buffer with utilities
// This is how we will create animation frames and string them together
// Save these in a place for later use.

// You can not currently pause during the middle of an animation
// Once it's sent it must run to completion.

function Animation (framelength, numberOfFrames, intensity) {
  this.framelength = framelength || 1;
  this.length = numberOfFrames || 1;
  var buffer = new Buffer(this.framelength*this.length*3);
  buffer.fill(0);
  this.buffer = buffer;
  this.intensity = intensity || 1;
}

Animation.prototype.setPixel = function(index, color, frame) {
  var color = utils.convertToRGB(color);
  var buffer = this.buffer;
  console.log("setting pixel " + index + " on frame " + frame);
  
  if(frame === undefined && this.framelength > 1){
    var frame;
    for (var i = buffer.length - 1; i >= 0; i-this.framelength) {
      frame = i;
      console.log("setting pixel " + index + " on frame " + frame);
      for (var j = 0; j < color.length; j++) {
        buffer[i * this.framelength + index+j ] = color[j];
      }
    }

  }
  else {
    console.log("setting pixel " + index);
    for (var i = 0; i < color.length; i++) {
      buffer[frame * this.framelength + index+i ] = color[i];
    }
  }
  return this;
};

Animation.prototype.setAll = function (color, frame) {
  var color = utils.convertToRGB(color);
  for (var i = 0; i < this.framelength; i++) {
      this.buffer[i*3] = color[0];
      this.buffer[i*3+1] = color[1];
      this.buffer[i*3+2] = color[2];
  }
  return this;
};

Animation.prototype.setPattern = function(){

};

module.exports = Animation;
