// Load npx library
var Npx = require('../');
//Todo: Refactor to tinytap
var mocha = require('mocha');
var expect = require('chai').expect;
var assert = require('chai').assert;


var npx = new Npx(60,1);

// utility colors, because why not.
var white = [0xFF, 0xFF, 0xFF];
var off = [0x00,0x00,0x00];
var red = [0x00, 0x11, 0x00];
var orange = [0x11, 0x33, 0x00];
var yellow = [0x11, 0x11, 0x00];
var green = [0x11, 0x00, 0x00];
var blue = [0x00, 0x00, 0x11];
var violet = [0x00, 0x11, 0x11];

describe('Npx', function(){
  it('should be new-able', function(){
    var npx = new Npx();
    expect(typeof npx).to.be.equal('object');
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
})

// npx.setAll([0x00,0x11,0x11])()
//   .then( npx.clear() )
//   .then(function(){ console.log('did the thing') });



// var colors = [red, orange, yellow, green, blue, violet];

// for (var i = 0; i < colors.length; i++) {
//   npx.enqueue(npx.setAll(colors[i], 1000))
// }

// npx.run()
//   .then(function(){console.log('done')});

