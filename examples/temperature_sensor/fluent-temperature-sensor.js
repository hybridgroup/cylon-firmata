"use strict";

var Cylon = require("cylon");

// For this example we are using TMP36 sensor
Cylon
  .robot()
  .connection("arduino", { adaptor: "firmata", port: "/dev/cu.usbmodem1451" })
  .device("sensor", { driver: "analogSensor", pin: 0 })

  .on("ready", function(bot) {
    var analogValue = 0,
    voltage = 0,
    temperature = 0;

    setInterval(function() {
      analogValue = bot.sensor.analogRead();
      voltage = (analogValue * 5.0) / 1024;
      temperature = (voltage - 0.5) * 100;

      console.log("Current Temperature => ", temperature);
    }, 5000);
  });

Cylon.start();
