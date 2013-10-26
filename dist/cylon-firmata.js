/*
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var Adaptor, Commands, Firmata, GPIO, LibFirmata,
    __slice = [].slice;

  GPIO = require("cylon-gpio");

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
      return GPIO.driver.apply(GPIO, args);
    },
    register: function(robot) {
      Logger.debug("Registering Firmata adaptor for " + robot.name);
      robot.registerAdaptor('cylon-firmata', 'firmata');
      return GPIO.register(robot);
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

}).call(this);
