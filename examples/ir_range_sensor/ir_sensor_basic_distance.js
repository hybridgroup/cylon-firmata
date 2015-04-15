"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    sensor: {
      driver: "ir-range-sensor",
      pin: 0,
      upperLimit: 400,
      lowerLimit: 100,
      model: "gp2y0a41sk0f"
    }
  },

  work: function(my) {
    every((1).seconds(), function() {
      var range = my.sensor.range();
      console.log("Range ===>", range);
    });
  }

}).start();
