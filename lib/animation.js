var utils = require('./utils');
var _ = require('lodash');
// Basically a buffer with utilities
// This is how we will create animation frames and string them together
// Save these in a place for later use.

// You can not currently pause during the middle of an animation
// Once it's sent it must run to completion.

function Animation (framelength, numberOfFrames, intensity) {
  this.framelength = framelength || 1;
  this.frames = numberOfFrames ? _.range(numberOfFrames) : _.range(1);
  var buffer = new Buffer(this.framelength*this.frames.length*3);
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
  if(frame === undefined){
    _.each(this.frames, function(frame){
      setColor(this.buffer, frame * this.framelength + index, color);
    },this);
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
    _.each( _.range(this.framelength*this.frames.length), function(pixelIndex){
      setColor(buffer, pixelIndex, color);
    },this);
  }else{
    _.each( _.range(this.framelength), function(pixelIndex){
      setColor(buffer, frame * this.framelength + pixelIndex, color);
    },this);
  }
  return this;
};

Animation.prototype.setPattern = function(colors, frame){
  var colors = _.map(colors, utils.convertToRGB);
  var pixels = _.range(this.framelength);
  var frames = this.frames;
  if(frame === undefined){
    _.forEach(pixels, function(pixel, index){
      this.setPixel(index,colors[index%colors.length]);
    },this);
  }
  else {
    _.forEach(pixels, function(pixel, index){
      this.setPixel( pixels.length * frame + index, colors[index%colors.length], frame);
    },this);
  }
  return this;
};

module.exports = Animation;
