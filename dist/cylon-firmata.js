/*
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var Adaptor, Commands, Driver, Firmata, Led,
    __slice = [].slice;

  module.exports = {
    adaptor: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Adaptor.Firmata, args, function(){});
    },
    driver: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Driver.Led, args, function(){});
    },
    register: function(robot) {
      Logger.info("Registering Firmata adaptor for " + robot.name);
      robot.registerAdaptor('cylon-firmata', 'firmata');
      Logger.info("Registering Sphero driver for " + robot.name);
      return robot.registerDriver('cylon-firmata', 'led');
    }
  };

  Firmata = require('firmata');

  Commands = ['pins', 'pinMode', 'digitalRead', 'digitalWrite', 'analogRead', 'analogWrite', 'servoWrite', 'sendI2CConfig', 'sendI2CWriteRequest', 'sendI2CReadRequest'];

  Adaptor = {
    Firmata: Firmata = (function() {
      function Firmata(opts) {
        this.self = this;
        this.connection = opts.connection;
        this.name = opts.name;
      }

      Firmata.prototype.connect = function(connection) {
        this.connection = connection;
        Logger.info("Connecting to board '" + this.name + "'...");
        this.board = Firmata.board(this.connection.port.toString())(function() {
          return this.connection.emit('connect');
        });
        this.setupCommands();
        return this.self;
      };

      Firmata.prototype.disconnect = function() {
        Logger.info("Disconnecting from board '" + this.name + "'...");
        return this.board.close;
      };

      Firmata.prototype.setupCommands = function() {
        var command, _i, _len;
        for (_i = 0, _len = Commands.length; _i < _len; _i++) {
          command = Commands[_i];
          if (typeof this.self[command] === 'function') {
            return;
          }
          this.self[command] = function() {
            var args, _ref;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return (_ref = this.board)[command].apply(_ref, args);
          };
        }
      };

      return Firmata;

    })()
  };

  Driver = {
    Led: Led = (function() {
      function Led(opts) {
        this.self = this;
        this.device = opts.device;
        this.connection = this.device.connection;
        this.pin = opts.pin;
        this.isOn = false;
      }

      Led.prototype.start = function() {
        return Logger.info("started");
      };

      Led.prototype.turnOn = function() {
        this.isOn = true;
        return this.connection.digitalWrite(this.pin, 1);
      };

      Led.prototype.turnOff = function() {
        this.isOn = false;
        return this.connection.digitalWrite(this.pin, 0);
      };

      Led.prototype.toggle = function() {
        if (this.isOn) {
          return turnOff();
        } else {
          return turnOn();
        }
      };

      return Led;

    })()
  };

}).call(this);
