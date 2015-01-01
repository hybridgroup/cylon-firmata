"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    motor: { driver: "motor", pin: 3 }
  },

  work: function(my) {
    var speed = 0,
        increment = 5;

    every((0.05).seconds(), function() {
      speed += increment;
      my.motor.speed(speed);

      console.log("Current Speed: " + (my.motor.currentSpeed()));

      if ((speed === 0) || (speed === 255)) { increment = -increment; }
    });
  }
}).start();
