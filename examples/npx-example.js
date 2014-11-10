var Npx = require('../'); // Replace '../' with 'npx' in your code

var npx = new Npx(70,1);

// npx.setAll([0x00,0x11,0x11])()
//   .then( npx.clear() )
//   .then(function(){ console.log('did the thing') });
var white = [0xFF, 0xFF, 0xFF];
var off = [0x00,0x00,0x00];
var red = [0x00, 0x11, 0x00];
var orange = [0x11, 0x33, 0x00];
var yellow = [0x11, 0x11, 0x00];
var green = [0x11, 0x00, 0x00];
var blue = [0x00, 0x00, 0x11];
var violet = [0x00, 0x11, 0x11];
var colors = [red, orange, yellow, green, blue, violet];

for (var i = 0; i < colors.length; i++) {
  npx.enqueue(npx.setAll(colors[i], 1000))
}
npx.enqueue(npx.clear());
npx.run()
  .then(function(){console.log('done')});