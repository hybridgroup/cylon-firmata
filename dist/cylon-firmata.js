/*
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var Adaptor, Commands, Driver, Firmata, Led, LibFirmata,
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
      Logger.debug("Registering Firmata adaptor for " + robot.name);
      robot.registerAdaptor('cylon-firmata', 'firmata');
      Logger.debug("Registering Sphero driver for " + robot.name);
      return robot.registerDriver('cylon-firmata', 'led');
    }
  };

  LibFirmata = require('firmata');

  Commands = ['pins', 'pinMode', 'digitalRead', 'digitalWrite'];

  Adaptor = {
    Firmata: Firmata = (function() {
      function Firmata(opts) {
        this.self = this;
        this.connection = opts.connection;
        this.name = opts.name;
        this.board = "";
      }

      Firmata.prototype.commands = function() {
        return Commands;
      };

      Firmata.prototype.connect = function(callback) {
        var _this = this;
        Logger.debug("Connecting to board '" + this.name + "'...");
        this.board = new LibFirmata.Board(this.connection.port.toString(), function() {
          _this.connection.emit('connect');
          return callback(null);
        });
        return this.setupCommands();
      };

      Firmata.prototype.disconnect = function() {
        Logger.debug("Disconnecting from board '" + this.name + "'...");
        return this.board.close;
      };

      Firmata.prototype.digitalWrite = function(pin, value) {
        this.board.pinMode(pin, this.board.MODES.OUTPUT);
        return this.board.digitalWrite(pin, value);
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
        this.pin = this.device.pin;
        this.isOn = false;
      }

      Led.prototype.commands = function() {
        return ['turnOn', 'turnOff', 'toggle'];
      };

      Led.prototype.start = function(callback) {
        Logger.debug("LED on pin " + this.pin + " started");
        return callback(null);
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
          return this.turnOff();
        } else {
          return this.turnOn();
        }
      };

      return Led;

    })()
  };

}).call(this);
