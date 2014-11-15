var Npx = require('../'); // Replace '../' with 'npx' in your code

var npx = new Npx(60,1);
// npx.setAll([0x00,0x11,0x11])()
//   // .then( npx.clear() )
//   .then(function(){ console.log('did the thing') });
var white = [0xFF,0xFF,0xFF];
var off = '#000000';
var red = '';
var orange = [0x33, 0x11, 0x00];
var yellow = [0x11, 0x11, 0x00];
var green = [0x00, 0x11,  0x00];
var blue = [0x00, 0x00, 0x11];
var violet = [0x11, 0x00, 0x11];
var colors = [red, orange, yellow, green, blue, violet];


// npx.loop(npx.setAll(white));
// setTimeout(function(){
//   npx.stop();
// }, 1000);

var walk = function (colorArray){
  // For every pixel we want a new frame;
  var animation = npx.newAnimation(60, 60);
  var frame;
  for (var i = 0; i < animation.length; i++) {
    // now write to the spots in the frame that you want colored
    // in this case I just want it to walk along one by one
    for (var j = 0; j < colorArray.length; j++) {
      // Remember now, I is the frame we're in so we'll increment out starting point by the frame that we're on.
      // j is the specific color we're focusing on and k for every byte in that color.
      var pixelIndex = i+j < animation.framelength ? i+j: (i+j - animation.framelength);
      console.log(pixelIndex, colorArray[j], i);
      animation.setPixel(pixelIndex, colorArray[j], i);
    }
  }
  return animation;
}

// var walkAnimation = walk(colors);
// for (var i = 0; i < 10; i++) {
//   npx.enqueue(walkAnimation, 1000);
// }

var animation = new npx.newAnimation(60,1);
animation.setAll("#0F0600")
npx.play(animation)
// npx.run()
//   .then(function(){console.log('done')});

// npx.setAll(white)();
