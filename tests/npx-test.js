var Npx = require('../'); // Replace '../' with 'npx' in your code

var npx = new Npx(60,1);

npx.setAll([0x00,0x11,0x11])()
  .then( npx.clear() )
  .then(function(){ console.log('did the thing') });