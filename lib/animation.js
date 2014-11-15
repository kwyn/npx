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

function setColor(buffer, index, color){
  buffer[index*3] = color[0];
  buffer[index*3+1] = color[1];
  buffer[index*3+2] = color[2];
}

Animation.prototype.setPixel = function(index, color, frame) {
  var color = utils.convertToRGB(color);
  console.log("setting pixel " + index + " on frame " + frame);
  
  if(frame === undefined && this.framelength > 1){
    for (var i = buffer.length - 1; i >= 0; i-this.framelength) {
      setColor(this.buffer, i * this.framelength + index, color)
    }
  }
  else {
    setColor(this.bufferframe * this.framelength + index)
  }
  return this;
};

Animation.prototype.setAll = function (color, frame) {
  var color = utils.convertToRGB(color);
  if(frame === undefined){
    for (var i = 0; i < this.framelength*this.length; i++) {
      setColor(this.buffer, i, color);
    }
  }else{
    for (var i = 0; i < this.framelength; i++) {
      setColor(this.buffer, i, color);
    }
  }
  return this;
};

Animation.prototype.setPattern = function(patternArray){
};

module.exports = Animation;
