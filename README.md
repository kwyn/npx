README.md

Pretend this is our neopixel string. We only happen to have six because our mean roommate cut out the rest and this is all you have left. 

[ [g,r,b] , [g,r,b] , [g,r,b] , [g,r,b] , [g,r,b] , [g,r,b] ]

Better known as RGB but alas, cheap manufacturing.

Each [g,r,b] value is a hex value between 0 and 255 9 or 0x00 and 0xFF in hex. JavaScript will convert for you so you can just make a fraction of 0xFF my multiplying by a decimal. It'll do all the rounding and what not for you. Such is the power of JavaScript. 

Currently the API for neopixels is based on animation frames that are strung together. Think of an animation frame as a series of neopixels. General speaking this will be the entire array of neopixels at your disposal but it can be subsets that are repeated. 

Neopixel.

Starting off simple.

Let's just set the lot of them to a single color.

that's as simple as

```JavaScript
var neopixels = new Neopixels();
function solid (numLEDs, color) {
  var buf = new Buffer(LED*3);
  for (var i = buf.length - 1; i >= 0; i--) {
    buf[i] = color[i%3];
    console.log(buf[i])
  }
  return buf;
};
```
where color is an array of hex values.


TODO:

Helper methods. 

`#FFF #FFFFF` to rgb (since pragmatically it's set to gbr);

Chaining color pixel (brute force then buffer optimization)
Off
Set all color
Set pattern
Set pulse
Set brightness
Set interval abstraction for animation frequency. (limited by 800hz but that's stupid fast anyways)
Promise interface for chaining animation.

Fix add animation listener memory leak. 

Proposed Object Oriented Interface:
var npx = new neopixel (numberOfPixels, brightness)
npx.setBrightness(value) // between 0-1
npx.off()
npx.setAll(color) // color is array [r, g, b]
npx.setPattern(arrayOfColors) 
npx.registerAnimation(name, sequenceArray)
npx.clearAnimations();
npx.setAnimationSequence(sequenceArray or stringName);
npx.runAnimation(stringName);
npx.queueAnimation()

Proposed Chained Interface:
npx
    .registerAnimation('name', sequenceArray)
    .setAll(color, time) 
    .animate(sequenceArray or name)
    .setAll(color, time)
    .animate(sequenceArray or name)
    .off()

