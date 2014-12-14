#Npx: A friendlier abstraction for the [Tessel Neopixel Library](https://github.com/tessel/neopixels)

##Neopixels (From original library)

[Neopixels](https://learn.adafruit.com/adafruit-neopixel-uberguide) are strands of individually addressable RGB LEDs, made by Adafruit. Neopixels consist of individual [WS2812B](http://www.adafruit.com/datasheets/WS2812B.pdf) chips which are also sold by other vendors like [SeeedStudio](http://www.seeedstudio.com/depot/Digital-RGB-LED-FlexiStrip-60-LED-1-Meter-p-1666.html?cPath=81_79) They're fantastic for creating light shows, art installations, mood lighting, and a ton of other applications.

This library is rather sparse at the moment and most of the functionality lies within a driver written in the firmware. It assumes a single strand of LEDs connected to pin G4 on the GPIO bank and RGB leds with a 800kHz signal.

##Installation (From original library)

Make sure you have firmware build `0.1.16` or later (```tessel board --version```) installed on Tessel.

Then connect the circuit. You'll need a separate power source because these LEDs require **a lot** of juice. Check out [Adafruit's Powering Guide](https://learn.adafruit.com/adafruit-neopixel-uberguide/power) for the best advice. Best practice is to power the neopixels with the 3.7V fixture on the GPIO bank when using Tessel (since it is a 3.3V MCU) but 5V has worked fine in practice. Connect the data wire to G4 on Tessel's GPIO bank and connect GND on Tessel to both GND wires from the neopixels.

With the following diagram the connections from neopixels to tessel are as follows:

Power -> pin 3
GND -> pin 1
Data -> pin 20

![GPIO bank with pins labeled](https://s3.amazonaws.com/technicalmachine-assets/doc+pictures/hardware_design_docs/gpio-pins.jpg)

## Getting started

Install via npm

```
npm install npx
```

Require npx
```
var Npx = require('npx');
```

Initialize npx with the number of neopixels attached to your Tessel
```
var npx = new Npx(<number of pixels goes here>);
```

Create your first single frame animation and set it to a color!
```
var yourFirstAnimation = npx.newAnimation(1) // initialized with number of animation frames
var yourFavoriteHexColor = '#FF00FF';

yourFirstAnimation.setAll(yourFavoriteHexColor);

npx.play(yourFirstAnimation);
```

Great! You're on your way now. Get making awesome hardware hacks and post it to the [projects page](https://projects.tessel.io/projects) when you're done!

## API
### Npx(totalPixels)
New-able constructor function that accepts the total number of pixels attached to Tessel

```
var npx = new Npx(totalPixels)
```

### npx.newAnimation(numberOfFrames)

Accepts an integer number of frames in the animation.
Returns and Animation object with frames equal to numberOfFrames and pixels initialized to off.

```JavaScript
var animation = npx.newAnimation(numberOfFrames);
```
###npx.play(animation)

Immediately plays animation.
```

npx.play(animation)
```

###npx.enqueue(animation, delay)
Accepts an Animation object and delay in milliseconds and puts it into the npx queue to be executed on [npx.run()](#)
Note that this will not immediately play the animation.

```JavaScript
// Create new animation
var animation = npx.newAnimation(numberOfFrames);

// enqueue blank animation with a 1 second (1000 milliseconds) after it completes
npx.enqueue(animation, 1000);
```

###npx.run()
Plays all animations in queue in order from first queued to last queued.

```JavaScript
var animationRed = npx.newAnimation(1).setAll('#FF0000');
var animationWhite = npx.newAnimation(1).setAll('#FFFFFF');
var animationBlue = npx.newAnimation(1).setAll('#0000FF');

npx.enqueue(animationRed,1000)
   .enqueue(animationWhite,1000)
   .enqueue(animationBlue,1000)
   .run();
```

note how the neopixels stay blue. This is because neopixels hold their state until they lose power. If you want to turn them off, send a new blank animation to the strip.

##Animation objects
Colors for animations can be of the form [R,G,B] where R,G, and B are values between 0 and 255 (or hex 0x00, 0xFF).

Alternatively colors may be CSS hex colors '#FFFFFF' Though at the moment CSS hex colors must be written out completely '#FFF' will not work.

###Properties

 - framelength: number of neopixels attached to Tessel.
 - buffer: the raw Buffer object. Contains animation data.
 - frames.length: number of animation frames in animation.

###Functions

####setAll(color, frame)
Sets all pixels in one frame to a color. If no frame is specified it will set it for all frames.

####setPixel(index, color, frame)
Sets single pixel to a color in a specific animation frame. If no frame is specified it will set it for all frames.

####setPattern(arrayOfColors, frame)
Sets all pixels in one frame to a color.If no frame is specified it will set it for all frames.

##TODO:
 - Implement on Animation:
    - pattern (colorArray, brightness)
    - pulse (color, brightness)
