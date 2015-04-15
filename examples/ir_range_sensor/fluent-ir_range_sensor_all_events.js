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
    var highest,
        lowest;

    bot.sensor.on("analogRead", function(val) {
      console.log("Analor Read Value ===>", val);

      if (highest === undefined) {
        highest = val;
      }

      if (lowest === undefined) {
        lowest = val;
      }

      highest = (val > highest) ? val : highest;
      lowest = (val < lowest) ? val : lowest;

      console.log("Highest IR Range Value read: ", highest);
      console.log("Lowest IR Range Value read: ", lowest);

      console.log("Range in CM =>", bot.sensor.rangeCm());
      console.log("Range in Inches =>", bot.sensor.range());
    });

    bot.sensor.on("upperLimit", function(val) {
      console.log("Upper limit reached ===> " + val);
    });

    bot.sensor.on("lowerLimit", function(val) {
      console.log("Lower limit reached ===> " + val);
    });
  });

Cylon.start();
