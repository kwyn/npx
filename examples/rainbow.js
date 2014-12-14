// Rainbow animation

// Require Npx module.
var Npx = require('../'); // Replace '../' with 'npx';

// Require lodash because who likes writing for loops.
var _ = require('lodash');

// Initialize npx object with number of neopixels
var npx = new Npx(60); // replace '60' with the number of neopixels connect to tessel

// Make some colors! Arrays and sting hex colors work
var red = [0xFF, 0x00, 0x00];
var orange = "#FFAF00";
var yellow = "#FFF000";
var green = [0x00, 0xFF, 0x00];
var blue = [0x00, 0x00, 0xFF];
var violet = [0xFF, 0x00, 0xFF];
var colors = [red, orange, yellow, green, blue, violet];

// For each color
_.forEach(colors, function(color, index, colors) {
  // Create an animation of one frame
  var animation = npx.newAnimation(1, 1);
  // Set patten offset for each animation
  var offset = 1;
  // Shift pattern by offset.
  var pattern = colors.slice(index).concat(colors.slice(0, index));
  // Set patten on animation
  animation.setPattern(pattern);
  // Queue animation with a delay
  // The delay is helpful since the next animation will over write it immediately if no delay is set.
  npx.enqueue(animation, 1500);
}, this);

//Run the queue :)
npx.loop();

// Note: You may want to actually save the animations in an array to be queued up again later
// It takes a while to build an animation
