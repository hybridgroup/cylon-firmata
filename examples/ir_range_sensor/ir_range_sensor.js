var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },

  device: {
    name: 'sensor',
    driver: 'analogSensor',
    pin: 0,
    upperLimit: 400,
    lowerLimit: 100
  },

  work: function(my) {
    var highest,
        lowest;

    my.sensor.on('analogRead', function(val){
      //console.log('Analor Read Value ===>', val);
      if (highest === undefined) highest = val;
      if (lowest === undefined) lowest = val;

      highest = (val > highest) ? val : highest;
      lowest = (val < lowest) ? val : lowest;
      console.log("Highest IR Range Value read: ", highest)
      console.log("Lowest IR Range Value read: ", lowest)
    });

    my.sensor.on('upperLimit', function(val) {
      console.log("Upper limit reached ===> " + val);
    });

    my.sensor.on('lowerLimit', function(val) {
      console.log("Lower limit reached ===> " + val);
    });
  }

}).start();
