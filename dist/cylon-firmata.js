/*
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var CliCommands, GPIO, I2C,
    __slice = [].slice;

  require("cylon");

  require("./firmata");

  CliCommands = require("./cli/commands");

  GPIO = require("cylon-gpio");

  I2C = require("cylon-i2c");

  module.exports = {
    adaptor: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Cylon.Adaptors.Firmata, args, function(){});
    },
    driver: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return GPIO.driver.apply(GPIO, args) || I2C.driver.apply(I2C, args);
    },
    register: function(robot) {
      Logger.debug("Registering Firmata adaptor for " + robot.name);
      robot.registerAdaptor('cylon-firmata', 'firmata');
      GPIO.register(robot);
      return I2C.register(robot);
    },
    registerCommands: function() {
      return {
        firmata: {
          description: "Upload firmata protocol to arduino",
          command: function(args) {
            var address, hexFile, subcmd;
            subcmd = args[0];
            address = args[1];
            hexFile = args.length > 2 ? args[2] : null;
            switch (subcmd) {
              case 'upload':
                return CliCommands.firmata.upload(address, hexFile);
              case 'install':
                return CliCommands.firmata.install();
              default:
                console.log("cylon firmata argument not recognized, try:\n");
                console.log("1.- cylon firmata upload <serial_address>");
                return console.log("2.- cylon firmata install\n");
            }
          }
        }
      };
    }
  };

}).call(this);
