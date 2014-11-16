var Npx = require('../'); // Replace '../' with 'npx' in your code
var _ = require('lodash');
var npx = new Npx(60,1);
// npx.setAll([0x00,0x11,0x11])()
//   // .then( npx.clear() )
//   .then(function(){ console.log('did the thing') });
var white = [0xFF,0xFF,0xFF];
var off = '#000000';
var red = [0x22,0x00,0x00];
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
  console.log(colorArray)
  var animation = npx.newAnimation(60, 60);
  _.each( _.range(animation.length), function(frame){
    _.each(colorArray, function(color, colorIndex){
      var pixelIndex = frame + colorIndex;
      if(frame + colorIndex <= animation.framelength ){
        pixelIndex = pixelIndex - animation.framelength;
      }
      animation.setPixel(pixelIndex, color, frame);
    });
  });
  return animation;
}

var walkAnimation = walk(colors);
for (var i = 0; i < 10; i++) {
  npx.enqueue(walkAnimation, 1000);
}
npx.run();
// npx.loop(walkAnimation);
// setTimeout(function(){
//   npx.stop();
// },5000)
// var animation = new npx.newAnimation(60,1);
// animation.setPattern(colors);
// var animation = new npx.newAnimation(60,1);
// animation.setAll("#0F0600")
// npx.play(animation)
// npx.run()
//   .then(function(){console.log('done')});

// npx.setAll(white)();
