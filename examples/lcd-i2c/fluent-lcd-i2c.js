"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/ttyACM0" })
  .device("lcd", { driver: "lcd" })
  .on("ready", function(bot) {
    bot.lcd.print("Hello!");
  });

Cylon.start();
