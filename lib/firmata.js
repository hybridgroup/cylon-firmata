/*
 * Cylonjs Firmata adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var LibFirmata = require('firmata'),
    namespace = require('node-namespace');

namespace("Cylon.Adaptors", function() {
  this.Firmata = (function(klass) {
    subclass(Firmata, klass);

    function Firmata(opts) {
      if (opts == null) { opts = {}; }

      Firmata.__super__.constructor.apply(this, arguments);

      this.board = "";
      this.myself = this;
      this.i2cReady = false;
    }

    Firmata.prototype.commands = function() {
      return [
        'pins',
        'pinMode',
        'digitalRead',
        'digitalWrite',
        'analogRead',
        'analogWrite',
        'pwmWrite',
        'servoWrite',
        'i2cConfig',
        'i2cWrite',
        'i2cRead'
      ];
    };

    Firmata.prototype.connect = function(callback) {
      var self = this;
      this.board = new LibFirmata.Board(this.connection.port, function() {
        callback(null);
        return self.connection.emit('connect');
      });
      return this.proxyMethods(this.commands, this.board, this.myself);
    };

    Firmata.prototype.disconnect = function() {
      Logger.debug("Disconnecting from board '" + this.name + "'...");
      return this.board.reset();
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

    Firmata.prototype.i2cWrite = function(address, cmd, buff, callback) {
      if (!this.i2cReady) { this._i2cConfig(); }
      this.board.sendI2CWriteRequest(address, [cmd].concat(buff));
      if ('function' === typeof(callback)) { callback(); }
    };

    Firmata.prototype.i2cRead = function(address, cmd, length, callback) {
      if (!this.i2cReady) { this._i2cConfig(2000); }
      this.board.sendI2CWriteRequest(address, [cmd]);
      this.board.sendI2CReadRequest(address, length, function(data){
        var err = null;

        if (data.name === 'Error') {
          err = data
          data = null;
        }

        callback(err, data);
      });
    };

    Firmata.prototype._i2cConfig = function(delay) {
      this.board.sendI2CConfig(delay);
      this.i2cReady = true;
    };

    return Firmata;

  })(Cylon.Adaptor);
});
