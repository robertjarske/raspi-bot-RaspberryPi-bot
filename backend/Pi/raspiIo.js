const raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new raspi({enableSoftPwm: true, enableSerial: true})
});

board.on('ready', function() {

var left = new five.Motor(['GPIO24', 'GPIO4', 'GPIO17']);
var right = new five.Motor(['GPIO14', 'GPIO25', 'GPIO10']);

  console.log("Start");
  left.forward(55);
  right.forward(55);

  board.wait(2000, () => {
   left.reverse(55);
   right.reverse(55);
  });

  board.wait(4000, () => {
   left.stop();
   right.stop();
  });
});