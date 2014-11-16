var utils = require('./utils');
var _ = require('lodash');
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
  if(frame === undefined && this.framelength > 1){
    _.each(_.range(this.framelength), function(frame){
      setColor(this.buffer, frame * this.framelength + index, color);
    });
  }
  else {
    setColor(this.buffer, frame * this.framelength + index, color)
  }
  return this;
};

Animation.prototype.setAll = function (color, frame) {
  var color = utils.convertToRGB(color);
  var buffer = this.buffer;
  if(frame === undefined){
    _.each( _.range(this.framelength*this.length), function(pixelIndex){
      setColor(buffer, pixelIndex, color);
    });
  }else{
    _.each( _.range(this.framelength), function(pixelIndex){
      setColor(buffer, frame * this.framelength + pixelIndex, color);
    });
  }
  return this;
};

Animation.prototype.setPattern = function(patternArray, frame){

};

module.exports = Animation;
