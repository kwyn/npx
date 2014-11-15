var expect = require('chai').expect;
// Remember to comment out hw and promisify Animation in npx.js
function promisifyAnimation(buffer, delay){
    var animation = Q.Promise(function(resolve, reject, notify){
      // Fake delay
      setTimeout(function(){
        resolve(buffer, delay);
      }, delay);
      // Normally we'd send the animation to the hardware here
    });
    return animation;
}

// Load npx library
var Npx = require('../');

var npx = new Npx(60,1);

// utility colors, because why not.
var white = [0xFF, 0xFF, 0xFF];
var off = [0x00,0x00,0x00];
var red = [0x00, 0x11, 0x00];
var orange = [0x11, 0x33, 0x00];
var yellow = [0x11, 0x11, 0x00];
var green = [0x11, 0x00, 0x00];
var blue = [0x00, 0x00, 0x11];
var violet = [0x00, 0x55, 0x55];

describe('Npx', function(){
  it('should be new-able', function(){
    var npx = new Npx();
    expect(npx).to.equal(npx);
  });
  it('should default to npx.totalPixels to 1', function(){
    var npx = new Npx();
    expect(npx.totalPixels).to.be.equal(1)
  });
});

describe('.setAll', function(){
  var pixels = 100;
  var brightness = 1;
  var npx = new Npx(pixels, brightness);
  it('should return a pending animation promise', function(){
    var setAllWhite = npx.setAll(white);
    expect(setAllWhite.isPending()).to.be.equal(true);
  });
});


