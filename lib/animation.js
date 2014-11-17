var utils = require('./utils');
var _ = require('lodash');
// Basically a buffer with utilities
// This is how we will create animation frames and string them together
// It's best to save these in a variable or object for later use

// You can not currently pause during the middle of an animation
// Once it's sent it must run to completion.

function Animation (framelength, numberOfFrames, intensity) {
  // Number of neopixels attached to Tessel
  this.framelength = framelength || 1;
  // Range of frames for looping purposes
  // Exposes frames.length which is also useful for animation creation
  this.frames = numberOfFrames ? _.range(numberOfFrames) : _.range(1);
  // Initialize buffer of appropriate length
  // We multiply by three since each pixel has an r, g, and b value
  var buffer = new Buffer(this.framelength*this.frames.length*3);
  // Clear buffer as new Buffer(length) initializes with random numbers
  buffer.fill(0);
  // Expose buffer to user
  this.buffer = buffer;

  // Yet to be implemented, should control intensity of the LEDs of all frames
  this.intensity = intensity || 1;
}

// Helper function to set a single pixel's color
function setColor(buffer, index, color){
  buffer[index*3] = color[0];
  buffer[index*3+1] = color[1];
  buffer[index*3+2] = color[2];
}

// Sets single pixel to a color in a specific animation frame
// If no frame is specified it will set it for all frames
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

// Sets all pixels in one frame to a color
// If no frame is specified it will set it for all frames
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

// Sets a repeating pattern to the frame
// If no frame is specified it'll set the pattern to all frames
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
