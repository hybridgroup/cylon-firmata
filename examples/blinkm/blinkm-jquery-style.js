var cylon = require('cylon');

var robot = cylon.robot({
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },
  device: { name: 'blinkm', driver: 'blinkm' }
});

robot.on('ready', function() {
  robot.blinkm.on('start', function() {

    robot.blinkm.stopScript();

    robot.blinkm.getFirmware(function(version) {
      console.log("Started BlinkM version " + version);
    });

    robot.blinkm.goToRGB(0,0,0);
    robot.blinkm.getRGBColor(function(data){
      console.log("Starting Color: ", data);
    });

    every((2).seconds(), function() {
      robot.blinkm.getRGBColor(function(data){
        console.log("Current Color: ", data);
      });
      robot.blinkm.fadeToRandomRGB(128, 128, 128);
    });
  });
});

cylon.start();
