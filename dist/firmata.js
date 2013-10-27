/*
 * Cylonjs Firmata adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var LibFirmata, namespace,
    __slice = [].slice;

  LibFirmata = require('firmata');

  namespace = require('node-namespace');

  namespace("Cylon.Adaptor", function() {
    return this.Firmata = (function() {
      function Firmata(opts) {
        this.self = this;
        this.connection = opts.connection;
        this.name = opts.name;
        this.board = "";
      }

      Firmata.prototype.commands = function() {
        return ['pins', 'pinMode', 'digitalRead', 'digitalWrite', 'analogRead', 'analogWrite'];
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

      Firmata.prototype.digitalRead = function(pin) {
        this.board.pinMode(pin, this.board.MODES.INPUT);
        return this.board.digitalRead(pin);
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

    })();
  });

}).call(this);
