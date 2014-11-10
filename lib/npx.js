var hw = process.binding('hw'); // Comment this out to run tests
var util = require('util');
var events = require('events');
var Q = require('q');

/*
 One function to send an animation to Tessel.
 Data gets sent on the GPIO bank's G4
*/

function animation (buffer, delay) {
  // Return a function that returns a promise so make api cleaner
  return function(){
    var animation = Q.Promise(function(resolve, reject, notify){
      process.once('neopixel_animation_complete', function animationComplete() {
        // Animation done, resolve promise and do next thing
        setTimeout(function(){
          resolve(buffer);
        }, delay);
      });
      // Send animation
      hw.neopixel_animation_buffer(buffer.length, buffer);
    });
    // Return animation promise
    return animation;
  }
}


function cutHex(hex) {return (hex.charAt(0)==='#') ? hex.substring(1,7):hex}
function hexToR(hex) {return parseInt((cutHex(hex)).substring(0,2),16)}
function hexToG(hex) {return parseInt((cutHex(hex)).substring(2,4),16)}
function hexToB(hex) {return parseInt((cutHex(hex)).substring(4,6),16)}


// Pixel interface is such that it's gbr, instead of rgb.
// This is a utility method to convert accepted color inputs to proper bits
function convertToRGB(color){
  if(typeof color === "string"){
    var R = hexToR("#FFFFFF");
    var G = hexToG("#FFFFFF");
    var B = hexToB("#FFFFFF");
    return [R,G,B];
  }
  return [color[1], color[0], color[2]];
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
Npx.prototype.enqueue = function (animation) {
  this.queue.push(animation);
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
  var color = convertToRGB(color);
  var arr = new Array(this.totalPixels);
  var bufferColor = new Buffer(color);
  for (var i = arr.length - 1; i >= 0; i--) {
    arr[i] = bufferColor;
  }
  return animation(Buffer.concat(arr), delay);
};

Npx.prototype.clear = function (delay) {
  var buf = new Buffer(this.totalPixels * 3);
  buf.fill(0);
  return animation(buf, delay);
};

Npx.prototype.loop = function (animation) {
  this.running = true;
  animation()
    .then(function play (buffer){
      if (this.running) this.animate( buffer.length, buffer, play.bind(this,buffer) );
      else this.clear();
    }.bind(this));
};

Npx.prototype.stop = function () {
  this.running = false;
  this.clear();
};

Npx.prototype.setPixel = function (index, color) {
  color = convertToRGB(color);
  var buffer = new Buffer(this.totalPixels * 3);
  buffer.fill(0);
  buffer[(index*3)] = color[0];
  buffer[(index*3 +1)] = color[1];
  buffer[(index*3 +2)] = color[2];
  return animation(buffer,1000);
};

Npx.prototype.walk = function (colorArray){
  // For every pixel we want a new frame;
  for (var i = 0; i < this.totalPixels; i++) {
    // Create a buffer as long as the LED strip
    // This is our frame
    var frame = new Buffer( this.totalPixels * 3);
    // now write to the spots in the frame that you want colored
    // in this case I just want it to walk along one by one
    frame.fill(0x00);
    for (var j = 0; j < colorArray.length; j++) {
      var color = convertToRGB(colorArray[j]);
      for (var k = 0; k < color.length; k++) {
        var bit = color[k];
        // Remember now, I is the frame we're in so we'll increment out starting point by the frame that we're on.
        // j is the specific color we're focusing on and k for every byte in that color.
        var frameIndex = i*3+j*3+k < frame.length ? i*3+j*3+k : (i*3+j*3+k - frame.length) ;
        frame[frameIndex] = bit;
      }
    }
    // Save frame to frame array
    this.queue.push(animation(frame,100));
  }
  return this.run();
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
  hw.neopixel_animation_buffer(numberOfPixels * 3, animationBuffer);
};

module.exports = Npx;