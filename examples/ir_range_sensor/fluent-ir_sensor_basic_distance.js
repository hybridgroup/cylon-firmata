"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/ttyACM0" })
  .device("sensor", {
    driver: "ir-range-sensor",
    pin: 0,
    upperLimit: 400,
    lowerLimit: 100,
    model: "gp2y0a41sk0f"
  })
  .on("ready", function(bot) {
    setInterval(function() {
      var range = bot.sensor.range();
      console.log("Range ===>", range);
    }, 1000);
  });

Cylon.start();
