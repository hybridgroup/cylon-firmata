"use strict";

var Cylon = require("cylon");

Cylon.robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/ttyACM0" })
  .device("blinkm", { driver: "blinkm" })
  .on("ready", function(bot) {
    bot.blinkm.stopScript();

    bot.blinkm.getFirmware(function(err, version) {
      console.log(err || "Started BlinkM version " + version);
    });

    bot.blinkm.goToRGB(0, 0, 0);

    bot.blinkm.getRGBColor(function(err, data) {
      console.log(err || "Starting Color: ", data);
    });

    setInterval(function() {
      bot.blinkm.getRGBColor(function(err, data) {
        console.log(err || "Current Color: ", data);
      });

      bot.blinkm.fadeToRandomRGB(128, 128, 128);
    }, 2000);
  });

Cylon.start();
