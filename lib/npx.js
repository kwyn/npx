var hw = process.binding('hw');
var util = require('util');
var events = require('events');
var Q = require('q');
// var _ = require('underscore');

/*
 One function to send an animation to Tessel.
 Data gets sent on the GPIO bank's G4
*/

function Animation () {
  this.buffer = new Buffer();
  this.duration = 10; // In milliseconds.
  this.frameLength = 0; // Number of pixels per frame.
  this.finished = false;
  this.active = false;
}

Animation.prototype.init = function (buffer, frameLength, duration) {
  this.buffer = buffer;
  this.frameLength = frameLength;
  this.duration = duration;
};

Animation.prototype.generate = function(){
  return function(){
    var animation = Q.Promise(function(resolve, reject, notify){

      process.once('neopixel_animation_complete', function animationComplete() {
        // Animation done, resolve promise and do next thing
          setTimeout( function(){
            console.log('end');
            resolve();
          }, delay);
      });
      // Send animation
      console.log('start')
      hw.neopixel_animation_buffer(buf.length, buf);
    });
    return animation;
  };
};

var animation = function (buf, delay) {
  return function(){
    var animation = Q.Promise(function(resolve, reject, notify){

      process.once('neopixel_animation_complete', function animationComplete() {
        // Animation done, resolve promise and do next thing
        setTimeout(function(){
          console.log('end');
          resolve();
        }, delay);
      });
      // Send animation
      console.log('start')
      hw.neopixel_animation_buffer(buf.length, buf);
    });
    return animation;
  };
};

// Animation.prototype.run = function

function Npx (totalPixels, brightness) {
  this.totalPixels = totalPixels;
  this.brightness = brightness ? brightness : 1;
  this.queue = [];
}

// Let Npx emit and respond to events.
util.inherits(Npx, events.EventEmitter);

// Queue an animation.
// Npx.prototype.enqueue = function (animationBuffer) {

// };

// Run animations in queue
// Npx.prototype.run = function () {
//   if(animationQueue.length){
//     this.animate(this.totalPixels, animationQueue.unshift());
//   }
//   // Play next animation once done.
//   this.on('done', function(){
//     this.animate(this.totalPixels, animationQueue.unshift());
//   })
// };


// Set all neopixels to one color.
Npx.prototype.setAll = function (color) {
  console.log(this.totalPixels);
  var arr = new Array(this.totalPixels);
  var pixel = new Buffer(color);
  for (var i = arr.length - 1; i >= 0; i--) {
    arr[i] = pixel;
  }
  return animation(Buffer.concat(arr));
};

Npx.prototype.clear = function () {
  var buf = new Buffer(this.totalPixels * 3);
  buf.fill(0);
  return animation(buf);
};
  // this.animate(this.totalPixels, buffer);

//   return Q.Promise(function(resolve, reject, notify){

//     process.once('neopixel_animation_complete', function animationComplete() {
//       // Animation done, resolve promise and do next thing
//         console.log('done with off');
//         resolve();
//     });

//     // Send animation
//     console.log('running off')
//     hw.neopixel_animation_buffer(this.buffer.length, this.buffer);
//   });
// };

Npx.prototype.animate = function (numberOfPixels, animationBuffer, callback) {
  // When we finish sending the animation
  process.once('neopixel_animation_complete', function animationComplete() {
    // Emit an end event
    this.emit('done');
    // If there is a callback
    if (callback) {
      // Call it
      callback();
    }
  }.bind(this));
  // Send the animation
  hw.neopixel_animation_buffer(numberOfPixels * 3, animationBuffer);
};

module.exports = Npx;