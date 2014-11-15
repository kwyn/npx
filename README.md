#Neopixels

[Neopixels](https://learn.adafruit.com/adafruit-neopixel-uberguide) are strands of individually addressable RGB LEDs, made by Adafruit. Neopixels consist of individual [WS2812B](http://www.adafruit.com/datasheets/WS2812B.pdf) chips which are also sold by other vendors like [SeeedStudio](http://www.seeedstudio.com/depot/Digital-RGB-LED-FlexiStrip-60-LED-1-Meter-p-1666.html?cPath=81_79) They're fantastic for creating light shows, art installations, mood lighting, and a ton of other applications. 

This library is rather sparse at the moment and most of the functionality lies within a driver written in the firmware. It assumes a single strand of LEDs connected to pin G4 on the GPIO bank and RGB leds with a 800kHz signal.

##Installation

Make sure you have firmware build `0.1.16` or later (```tessel board --version```) installed on Tessel. 

Then, install this library clone this repo into your working directory and include the folder.  

Then connect the circuit. You'll need a separate power source because these LEDs require **a lot** of juice. Check out [Adafruit's Powering Guide](https://learn.adafruit.com/adafruit-neopixel-uberguide/power) for the best advice. Best practice is to power the neopixels with 3.7V when using Tessel (since it is a 3.3V MCU) but 5V has worked fine in practice. Connect the data wire to G4 on Tessel's GPIO bank and connect GND on Tessel to both GND wires from the neopixels.

# Current Methods:
```JavaScript
var npx = new Npx(totalPixels) // Number of pixels on your neopixel strip
var animation = npx.newAnimation(numberOfFrames) // return a new animation 
npx.enqueue(animation, delay) // enqueue an animation object and delay between it and the next option.
npx.run() // Runs queued animations
npx.play(animation) // Immediately plays animation. 
```

TODO:
 - Implement on Animation:
    - pattern (colorArray, brightness)
    - pulse (color, brightness)
