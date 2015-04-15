"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    arduino: { adaptor: "firmata", port: "/dev/ttyACM0" }
  },

  devices: {
    maxbotix: { driver: "maxbotix", pin: 1 }
  },

  work: function(my) {
    every((1).seconds(), function() {
      my.maxbotix.range(function(err, data) {
        console.log(err || "range: " + data);
      });
    });
  }
}).start();
