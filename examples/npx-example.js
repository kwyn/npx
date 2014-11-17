var Npx = require('../'); // Replace '../' with 'npx' in your code
var _ = require('lodash');
var npx = new Npx(60);
// npx.setAll([0x00,0x11,0x11])()
//   // .then( npx.clear() )
//   .then(function(){ console.log('did the thing') });
var white = [0xFF,0xFF,0xFF];
var off = '#000000';
var red = [0x0f,0x00,0x00];
var orange = "#0F0600";
var yellow = [0x0f, 0x0f, 0x00];
var green = [0x00, 0x0f,  0x00];
var blue = [0x00, 0x00, 0x0f];
var violet = [0x11, 0x00, 0x09];
var colors = [red, orange, yellow, green, blue, violet];


// npx.loop(npx.setAll(white));
// setTimeout(function(){
//   npx.stop();
// }, 1000);

var walk = function (colorArray){
  // For every pixel we want a new frame;
  console.log(colorArray)
  var animation = npx.newAnimation(60, 1);
  _.each(animation.frames, function(frame){
    _.each(colorArray, function(color, colorIndex){
      var pixelIndex = frame + colorIndex;
      if(frame + colorIndex >= animation.framelength-1){
        pixelIndex = pixelIndex - animation.framelength;
      }
      animation.setPixel(pixelIndex, color, frame);
    });
  });
  return animation;
}

// var walkAnimation = walk(colors);
// for (var i = 0; i < 10; i++) {
//   npx.enqueue(walkAnimation, 1000);
// }
// npx.run();
// npx.loop(walkAnimation);
// setTimeout(function(){
//   npx.stop();
// },5000)

_.forEach(colors, function(color, index, colors){
  var animation = npx.newAnimation(1,1);
  var pattern = colors.slice(index).concat(colors.slice(0, index));
  animation.setPattern(pattern);
  npx.enqueue(animation, 1000);
},this);

npx.run();

// var animation = npx.newAnimation(1,1);
// animation.setPattern(colors);
// for (var i = 0; i < 10; i++) {
//   npx.enqueue(walkAnimation, 1000);
// }
// npx.play(animation);


// var animation = new npx.newAnimation(60,1);
// animation.setAll("#0F0600")
// npx.play(animation)
// npx.run()
//   .then(function(){console.log('done')});

// npx.setAll(white)();
