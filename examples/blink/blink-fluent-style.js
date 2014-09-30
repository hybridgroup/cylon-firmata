var cylon = require('cylon');

var robot = cylon.robot({
  name: 'samantha',
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },
  device: { name: 'led', driver: 'led', pin: 13 }
});

robot.on('ready', function() {
  every((1).second(), function() {
    robot.led.toggle();
  });
});

cylon.start();
