var hw = process.binding('hw'); // Comment this and promisifyAnimation out to run tests
var util = require('util');
var events = require('events');
var Q = require('q');
var Animation = require('./animation')

/*
 One function to send an animation to Tessel.
 Data gets sent on the GPIO bank's G4
*/

function promisifyAnimation (animation, delay) {
  // Return a function that returns a promise so make api cleaner
  return function(){
    var promise = Q.Promise(function(resolve, reject, notify){
      process.once('neopixel_animation_complete', function animationComplete() {
        // Animation done, resolve promise and do next thing
        setTimeout(function(){
          resolve(animation.buffer);
        }, delay);
      });
      // Send animation
      console.log(animation.buffer);
      hw.neopixel_animation_buffer(animation.framelength*3, animation.buffer);
    });
    // Return animation promise
    return promise;
  }
}

// ---------------------------------------------------------------
// Comment out above code and comment in the following mock.
// ---------------------------------------------------------------

// Start animation mock
// These test need to work without a Tessel plugged in.
// var animation = function(buffer, delay){
//     var animation = Q.Promise(function(resolve, reject, notify){
//       // Fake delay
//       setTimeout(function(){
//         resolve(buffer, delay); // Send
//       }, delay);
//       // Normally we'd send the animation to the hardware here
//     });
//     return animation;
// }


// On day this will also take in the GPIO pin as a parameter.
function Npx (totalPixels) {
    this.totalPixels = totalPixels || 1;
    this.queue = [];
    this.running = false;
}

// Let Npx emit and respond to events.
util.inherits(Npx, events.EventEmitter);

// Queue an animation
Npx.prototype.enqueue = function (animation, delay) {
  this.queue.push( promisifyAnimation(animation,delay) );
};

Npx.prototype.newAnimation = function(numberOfFrames, intensity){
  return new Animation(this.totalPixels, numberOfFrames, intensity);
};

// Run animations in queue
Npx.prototype.run = function () {
  return Q.Promise(function(resolve, reject, notify){
    // Recursive run function pasing along the index to optimize for long queues.
    var run = function(index){
      if(index === undefined) {
        index = 0;
      }
      if(this.queue.length > index && this.running){
        var animation = this.queue[index];
        // Instead of using unshift here we just inspect
        // This is an optimization for long queues
        animation()
          .then( function(){ run(++index); } );
      } else {
        this.running = false;
        // Clear the queue since we're inspecting instead of unshift
        queue = [];
        resolve();
      }
    }.bind(this);
    // Execute all items in queue.
    this.running = true;
    run(0);
  }.bind(this))
};

// Set all neopixels to one color.
Npx.prototype.setAll = function (color, delay) {
  var animation = new Animation(this.totalPixels,1);
  console.log(animation)
  animation.setAll(color);
  console.log(animation)
  return promisifyAnimation(animation, delay);
};

Npx.prototype.clear = function (delay) {
  var buf = new Buffer(this.totalPixels * 3);
  buf.fill(0);
  return promisifyAnimation(buf, delay);
};

Npx.prototype.loop = function (animation) {
  this.running = true;
  var animation = promisifyAnimation(animation)
  animation()
    .then(function play (animation){
      console.log('play!', this.running)
      if (this.running) this.animate(animation.framelength, animation.buffer, play.bind(this,animation) );
      else this.clear();
    }.bind(this));
};

Npx.prototype.stop = function () {
  this.running = false;
  this.clear();
};

Npx.prototype.play = function (animation) {
  this.animate(animation.framelength, animation.buffer);
}

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
  hw.neopixel_animation_buffer(numberOfPixels*3, animationBuffer);
};

module.exports = Npx;
