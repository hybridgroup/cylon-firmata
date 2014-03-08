/*
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

require("cylon");
require("./firmata");
require("./cli/firmata");

var GPIO = require("cylon-gpio"),
    I2C = require("cylon-i2c");

module.exports = {
  adaptor: function(args) {
    return new Cylon.Adaptors.Firmata(args);
  },

  driver: function(args) {
    return(GPIO.driver.apply(GPIO, args) || I2C.driver.apply(I2C, args));
  },

  register: function(robot) {
    Logger.debug("Registering Firmata adaptor for " + robot.name);
    robot.registerAdaptor('cylon-firmata', 'firmata');

    GPIO.register(robot);
    I2C.register(robot);
  },

  registerCommands: function() {
    var commands;
    commands = {
      firmata: {
        description: "Upload firmata protocol to arduino",
        command: function(args) {
          var subcmd = args[0],
              serialPort = args[1],
              hexFile = args.length > 2 ? args[2] : null,
              firmata = new Cylon.CLI.Firmata(serialPort, hexFile);

          switch (subcmd) {
            case 'upload':
              firmata.upload();
              break;
            case 'install':
              firmata.install();
              break;
            default:
              console.log("cylon firmata argument not recognized, try:\n");
              console.log("1.- cylon firmata upload <serial_port> [optional_hex_file]");
              console.log("2.- cylon firmata install\n");
          }
        }
      }
    };

    return commands;
  }
};
