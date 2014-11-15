Npx.prototype.walk = function (colorArray) {
  var frames = [];
  // For every pixel we want a new frame;
  for (var i = 0; i < this.totalPixels+1; i++) {
    // Create a buffer as long as the LED strip
    // This is our frame
    var frame = new Buffer( this.totalPixels * 3);
    // now write to the spots in the frame that you want colored
    // in this case I just want it to walk along one by one
    frame.fill(0x00);
    for (var j = 0; j < colorArray.length; j++) {
      var color = convertToRGB(colorArray[j]);
      for (var k = 0; k < color.length; k++) {
        var bit = color[k];
        // Remember now, I is the frame we're in so we'll increment out starting point by the frame that we're on.
        // j is the specific color we're focusing on and k for every byte in that color.
        var frameIndex = i*3+j*3+k < frame.length ? i*3+j*3+k : (i*3+j*3+k - frame.length) ;
        frame[frameIndex] = bit;
      }
    }
    for (var z = 0; z < 1; z++) {
      frames.push(frame);
    }
  }
  var start = new Date();
    // Save frame to frame array
  this.animate(this.totalPixels, Buffer.concat(frames), function(){
                  var end = new Date();
                  var elapsed = end - start;
                  console.log('done', elapsed)}.bind(this))
  // this.queue.push(promisifyAnimation(frame));
  // }
  var start = new Date();
  return this.run()
             .then(function(){
                  var end = new Date();
                  var elapsed = end - start;
                  console.log('done', elapsed)});
}
