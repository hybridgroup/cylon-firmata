"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/ttyACM0" })
  .device("led", { driver: "led", pin: 3 })
  .on("ready", function(bot) {
    var brightness = 0,
    fade = 5;

    setInterval(function() {
      brightness += fade;
      bot.led.brightness(brightness);
      if ((brightness === 0) || (brightness === 255)) { fade = -fade; }
    }, 500);
  });

Cylon.start();
