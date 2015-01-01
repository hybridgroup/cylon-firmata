"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    maxbotix: { driver: "maxbotix" }
  },

  work: function(my) {
    every((1).seconds(), function() {
      my.maxbotix.range(function(err, data) {
        console.log("range: " + data);
      });
    });
  }
}).start();
