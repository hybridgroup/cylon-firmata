"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/ttyACM0" })
  .device("hmc6352", { driver: "hmc6352" })
  .on("ready", function(bot) {
    setInterval(function() {
      bot.hmc6352.heading(function(err, data) {
        console.log(err || "heading: " + data);
      });
    }, 1000);
  });

Cylon.start();
