"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/ttyACM0" })
  .device("maxbotix", { driver: "maxbotix", pin: 1 })
  .on("ready", function(bot) {
    setInterval(function() {
      bot.maxbotix.range(function(err, data) {
        console.log(err || "range: " + data);
      });
    }, 1000);
  });

Cylon.start();
