"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    sensor: { driver: "analogSensor", pin: 0, upperLimit: 900, lowerLimit: 100 }
  },

  work: function(my) {
    my.sensor.on("analogRead", function(val) {
      console.log("analog read value:", val);
      console.log("analog read value:", my.sensor.analogRead());
    });

    my.sensor.on("upperLimit", function(val) {
      console.log("Upper limit reached ===> " + val);
    });

    my.sensor.on("lowerLimit", function(val) {
      console.log("Lower limit reached ===> " + val);
    });
  }

}).start();
