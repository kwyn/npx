// Rainbow animation

// Require Npx module.
var Npx = require('../'); // Replace '../' with 'npx';

// Initialize npx object with number of neopixels
var npx = new Npx(60); // replace '60' with the number of neopixels connect to tessel

// Create colored animations
var animationRed = npx.newAnimation(1).setAll('#FF0000');
var animationWhite = npx.newAnimation(1).setAll('#FFFFFF');
var animationBlue = npx.newAnimation(1).setAll('#0000FF');

//queue up animations
npx.enqueue(animationRed, 1000)
   .enqueue(animationWhite, 1000)
   .enqueue(animationBlue, 1000)
   //run animations :D
   .run();
