"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("arduino", {
    name: "arduino",
    adaptor: "firmata",
    port: "/dev/ttyACM1"
  })
  .device("sensor", {
    driver: "ir-range-sensor",
    pin: 0,
    upperLimit: 400,
    lowerLimit: 100,
    model: "gp2y0a41sk0f"
  })
  .on("ready", function(bot) {
    bot.sensor.on("range", function(range) {
      console.log("Range in inches ===>", range);
    });

    bot.sensor.on("rangeCm", function(range) {
      console.log("Range in cm ===>", range);
    });
  });

Cylon.start();
