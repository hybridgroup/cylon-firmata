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
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  LibFirmata = require('firmata');

  namespace = require('node-namespace');

  namespace("Cylon.Adaptor", function() {
    return this.Firmata = (function(_super) {
      __extends(Firmata, _super);

      function Firmata(opts) {
        Firmata.__super__.constructor.apply(this, arguments);
        this.connection = opts.connection;
        this.name = opts.name;
        this.board = "";
      }

      Firmata.prototype.commands = function() {
        return ['pins', 'pinMode', 'digitalRead', 'digitalWrite', 'analogRead', 'analogWrite', 'pwmWrite', 'servoWrite', 'i2cConfig', 'i2cWrite', 'i2cRead'];
      };

      Firmata.prototype.connect = function(callback) {
        var _this = this;
        Logger.debug("Connecting to board '" + this.name + "'...");
        this.board = new LibFirmata.Board(this.connection.port.toString(), function() {
          callback(null);
          return _this.connection.emit('connect');
        });
        return this.proxyMethods(this.commands, this.board, Firmata);
      };

      Firmata.prototype.disconnect = function() {
        Logger.debug("Disconnecting from board '" + this.name + "'...");
        return this.board.close;
      };

      Firmata.prototype.digitalRead = function(pin, callback) {
        this.board.pinMode(pin, this.board.MODES.INPUT);
        return this.board.digitalRead(pin, callback);
      };

      Firmata.prototype.digitalWrite = function(pin, value) {
        this.board.pinMode(pin, this.board.MODES.OUTPUT);
        return this.board.digitalWrite(pin, value);
      };

      Firmata.prototype.analogRead = function(pin, callback) {
        return this.board.analogRead(pin, callback);
      };

      Firmata.prototype.analogWrite = function(pin, value) {
        this.board.pinMode(this.board.analogPins[pin], this.board.MODES.ANALOG);
        return this.board.analogWrite(this.board.analogPins[pin], value);
      };

      Firmata.prototype.pwmWrite = function(pin, value) {
        this.board.pinMode(pin, this.board.MODES.PWM);
        return this.board.analogWrite(pin, value);
      };

      Firmata.prototype.servoWrite = function(pin, value) {
        this.board.pinMode(pin, this.board.MODES.SERVO);
        return this.board.analogWrite(pin, value);
      };

      Firmata.prototype.i2cConfig = function(delay) {
        return this.board.sendI2CConfig(delay);
      };

      Firmata.prototype.i2cWrite = function(address, data) {
        return this.board.sendI2CWriteRequest(address, data);
      };

      Firmata.prototype.i2cRead = function(address, length, callback) {
        return this.board.sendI2CReadRequest(address, length, callback);
      };

      return Firmata;

    })(Cylon.Basestar);
  });

}).call(this);
