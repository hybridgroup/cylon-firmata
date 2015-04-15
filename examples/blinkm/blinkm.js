"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    blinkm: { driver: "blinkm" }
  },

  work: function(my) {
    my.blinkm.stopScript();

    my.blinkm.getFirmware(function(err, version) {
      console.log(err || "Started BlinkM version " + version);
    });

    my.blinkm.goToRGB(0, 0, 0);

    my.blinkm.getRGBColor(function(err, data) {
      console.log(err || "Starting Color: ", data);
    });

    every((2).seconds(), function() {
      my.blinkm.getRGBColor(function(err, data) {
        console.log(err || "Current Color: ", data);
      });
      my.blinkm.fadeToRandomRGB(128, 128, 128);
    });
  }
}).start();
