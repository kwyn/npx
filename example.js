var Neopixels = require('../');

var neopixels = new Neopixels();

neopixels.on('end', function() {
  // animate(numberOfPixels, animationFramesBuffer)
  var last = colors.pop();
  colors.unshift(last);
  neopixels.animate(maxPixels, rainbow(colors,0));
  // neopixels.animate(70, solid(70, 0x00));
});

// function tracer(numLEDs) {
//   var trail = 5;
//   var arr = new Array(numLEDs);
//   for (var frame = 0; frame < numLEDs; frame++) {
//     // Buffer of length 300
//     var buf = new Buffer(numLEDs * 3);
//     buf.fill(0);
//     for (var color = 0; color < 3; color++){
//       for (var k = 0; k < trail; k++) {
//         buf[(3*(frame+numLEDs*color/3)+color+1 +3*k)] = 0xFF*(trail-k)/trail;
//       }
//     }
//     arr[i] = buf;
//   }
//   console.log(arr.length);
//   return arr;
// }
var maxPixels = 70;
function solidWhite (numLEDs){
  var buf = new Buffer(numLEDs * 3);
  buf.fill(0xFF);
  return buf;
};

function setAll(color){
  var arr = new Array(maxPixels);
  pixel = new Buffer(color)
  for (var i = arr.length - 1; i >= 0; i--) {
    arr[i] = pixel;
  }
  return Buffer.concat(arr);
};

function hexToBuffer (hex) {
  // takes hex and converts #FFF or #FFFFFF to grb array.
  console.log(rgb);
  return grb
}

function encodeColor(hexArray) {

}

function off (numLEDs){
  var buf = new Buffer(numLEDs * 3);
  buf.fill(0);
  return buf;
}

var red = [0x00, 0xFF, 0x00];
var orange = [0x55, 0xCC, 0x00];
var yellow = [0xFF, 0xFF, 0x00];
var green = [0xFF, 0x00, 0x00];
var blue = [0x00, 0x00, 0xFF];
var violet = [0x00, 0xFF, 0xFF];

var colors = [red, orange, yellow, green, blue, violet];

function rainbow(colors, offset){
  var arr = Array(maxPixels);
  var length = colors.length;
  for (var i = arr.length - 1; i >= 0; i--) {
    arr[i] = new Buffer(colors[(i+offset)%length]);
  }
  var animation = Buffer.concat(arr);
  console.log(animation.length, offset)
  return animation;
};

function animateRainbow(colors){
  var arr = Array(colors.length);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = rainbow(colors,i);
  }
  var animation = Buffer.concat(arr)
  console.log(animation.length, maxPixels*colors.length*3 )
  return animation;
}


function pulse(){
  var base = [0x44,0xFF,0x00];
  var color = [0x00,0x00,0x00];
  var delta = 0.1;
  var magnitude = 0;
  var thresholds = [0,0.5];
  setInterval(function(){
    magnitude += delta;

    if(magnitude < thresholds[0]){
      magnitude = thresholds[0];
      delta = delta * -1;
    }
    if(magnitude > thresholds[1]){
      magnitude = thresholds[1];
      delta = delta * -1;
    }

    for (var i = color.length - 1; i >= 0; i--) {
      color[i] = base[i]*magnitude;
    }
    console.log(magnitude, delta, color, base);
    neopixels.animate(maxPixels, setAll(color));
  },100)
}

neopixels.animate(maxPixels, animateRainbow(colors));

// neopixels.animate(100, Buffer.concat(tracer(100)));