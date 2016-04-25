"use strict";

var Cylon = require("cylon");

var CURIE_IMU = 0x11,
    CURIE_IMU_READ_ACCEL = 0x00;

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    led: { driver: "led", pin: 13 },
  },

  work: function(my) {
    every(100, function() {
      my.led.toggle();
      my.arduino.sysexCommand([CURIE_IMU, CURIE_IMU_READ_ACCEL]);
    });

    my.arduino.sysexResponse(CURIE_IMU, function(data) {
      var subcommand = data.shift();
      if (subcommand === CURIE_IMU_READ_ACCEL) {
        console.log("CURIE_IMU_READ_ACCEL", my.arduino.decode(data));
      }
    });
  }
}).start();
