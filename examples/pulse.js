// Require Npx module.
var Npx = require('../'); // Replace '../' with 'npx';

// Initialize npx object with number of neopixels
// replace '60' with the number of neopixels connect to tessel
var npx = new Npx(60); 


// fn from Craig Buckler
// http://www.sitepoint.com/javascript-generate-lighter-darker-color/
var calculateColorLuminance = function(hex, luminosity) {
  // takes hex with or without #
  // luminosity is a decimal
    // .2 would result in a 20% increase
    // -.4 would result in a 40% decrease

  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  luminosity = luminosity || 0;

  // convert to decimal and change luminosity
  var rgb = "#", c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * luminosity)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
};

var createAndSaveAnimation = function(hex, delay, numberOfFrames) {
  // Create an animation of n frames, defaults to 1
  var animation = npx.newAnimation(numberOfFrames || 1);
  // Set patten on animation
  animation.setAll(hex);
  // Queue animation with a delay
  npx.enqueue(animation, delay);
};

var pulse = function(startHex, steps) {
  var luminosity = 0;
  var reductionRate = 1 / steps;
  // start luminosity as no different than startHex
  createAndSaveAnimation(startHex, 5);

  // fade out
  for (var i = 0; i < steps; i++) {
    luminosity += reductionRate;
    createAndSaveAnimation(calculateColorLuminance(startHex, -1 * luminosity), 5);
  }

  // start again with no luminosity
  createAndSaveAnimation('#000000', 5);

  // fade in
  for (var i = 0; i < steps; i++) {
    luminosity -= reductionRate;
    createAndSaveAnimation(calculateColorLuminance( startHex, -1 * luminosity ), 5);
  }
};

// set hex and steps
pulse( '#e472ac', 100);

// run the queue
npx.loop();
