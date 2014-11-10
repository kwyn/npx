var Npx = require('../'); // Replace '../' with 'npx' in your code

var npx = new Npx(60,1);

// npx.setAll([0x00,0x11,0x11])()
//   // .then( npx.clear() )
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


// npx.loop(npx.setAll(white));
// setTimeout(function(){
//   npx.stop();
// }, 1000);

npx.walk(colors).then(console.log('done'));

// for (var i = 0; i < npx.totalPixels; i++) {
//   npx.enqueue(npx.setPixel(i, violet) )
// }
// npx.run()
//   .then(function(){console.log('done')});