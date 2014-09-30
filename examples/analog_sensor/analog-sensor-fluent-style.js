var cylon = require('cylon');

var robot = cylon.robot({
  name: 'samantha',
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0'},
  device: { name: 'sensor', driver: 'analogSensor', pin: 0, upperLimit: 900, lowerLimit: 100 }
});

robot.on('ready', function() {
  robot.sensor.on('upperLimit', function(val) {
    console.log("Upper limit reached ===> " + val);
  });

  robot.sensor.on('lowerLimit', function(val) {
    console.log("Lower limit reached ===> " + val);
  });
});

cylon.start();
