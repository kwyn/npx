function cutHex(hex) {return (hex.charAt(0)==='#') ? hex.substring(1,7):hex}
function hexToR(hex) {return parseInt((cutHex(hex)).substring(0,2),16)}
function hexToG(hex) {return parseInt((cutHex(hex)).substring(2,4),16)}
function hexToB(hex) {return parseInt((cutHex(hex)).substring(4,6),16)}

var utils = {
  // Pixel interface is such that it's gbr, instead of rgb.
  // This is a utility method to convert accepted color inputs to proper bits
  convertToRGB: function(color){
    if(typeof color === "string"){
      var R = hexToR(color);
      var G = hexToG(color);
      var B = hexToB(color);
      return [G,R,B];
    }
    return [color[1], color[0], color[2]];
  }
};

module.exports = utils;
