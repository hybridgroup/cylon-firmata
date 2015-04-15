"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    hmc6352: { driver: "hmc6352" }
  },

  work: function(my) {
    every((1).second(), function() {
      my.hmc6352.heading(function(err, data) {
        console.log(err || "heading: " + data);
      });
    });
  }
}).start();
