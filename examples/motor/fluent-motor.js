"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/ttyACM0" })
  .device("motor", { driver: "motor", pin: 3 })
  .on("ready", function(bot) {
    var speed = 0,
    increment = 5;

    setInterval(function() {
      speed += increment;
      bot.motor.speed(speed);

      console.log("Current Speed: " + (bot.motor.currentSpeed()));

      if ((speed === 0) || (speed === 255)) { increment = -increment; }
    }, 500);
  });

Cylon.start();
