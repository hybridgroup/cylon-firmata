/*
 * Cylonjs Adaptor adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013-2014 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Firmata = require("firmata");
var Cylon = require("cylon");

/**
 * A Firmata adaptor
 *
 * @constructor
 *
 * @param {Object} opts
 * @param {String} opts.port the serial port to connect to the board over
 */
var Adaptor = module.exports = function Adaptor() {
  Adaptor.__super__.constructor.apply(this, arguments);

  this.board = "";
  this.i2cReady = false;

  if (this.port == null) {
    throw new Error("No port specified for Firmata adaptor. Cannot proceed");
  }
};

Cylon.Utils.subclass(Adaptor, Cylon.Adaptor);

Adaptor.prototype.commands = [
  "pinMode",
  "digitalRead",
  "digitalWrite",
  "analogRead",
  "analogWrite",
  "pwmWrite",
  "servoWrite",
  "i2cConfig",
  "i2cWrite",
  "i2cRead"
];

/**
 * Connects to the Firmata-compatible board
 *
 * @param {Function} callback to be triggered when connected
 * @return {null}
 */
Adaptor.prototype.connect = function(callback) {
  this.board = new Firmata.Board(this.port, function(data) {
    this.emit("connect");
    callback(null, data);
  }.bind(this));

  this.proxyMethods(this.commands, this.board, this);
};

/**
 * Disconnects from the Firmata-compatible board
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {null}
 */
Adaptor.prototype.disconnect = function(callback) {
  this.board.reset();
  callback();
};

/**
 * Reads a value from a digital pin
 *
 * @param {Number} pin
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {null}
 * @publish
 */
Adaptor.prototype.digitalRead = function(pin, callback) {
  this.pinMode(pin, "input");

  var adCallback = function(readVal) {
    callback(null, readVal);
  };

  this.board.digitalRead(pin, adCallback);
};

/**
 * Writes a value to a digital pin
 *
 * @param {Number} pin
 * @param {Number} value
 * @return {null}
 * @publish
 */
Adaptor.prototype.digitalWrite = function(pin, value) {
  this.pinMode(pin, "output");
  this.board.digitalWrite(pin, value);
};

/**
 * Reads a value from an analog pin
 *
 * @param {Number} pin
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {null}
 * @publish
 */
Adaptor.prototype.analogRead = function(pin, callback) {
  var adCallback = function(readVal) {
    callback(null, readVal);
  };

  this.board.analogRead(pin, adCallback);
};

/**
 * Writes a value to an analog pin
 *
 * @param {Number} pin
 * @param {Number} value
 * @return {null}
 * @publish
 */
Adaptor.prototype.analogWrite = function(pin, value) {
  value = (value).toScale(0, 255);
  this.pinMode(this.board.analogPins[pin], "analog");
  this.board.analogWrite(this.board.analogPins[pin], value);
};

/**
 * Writes a PWM value to a pin
 *
 * @param {Number} pin
 * @param {Number} value
 * @return {null}
 * @publish
 */
Adaptor.prototype.pwmWrite = function(pin, value) {
  value = (value).toScale(0, 255);
  this.pinMode(pin, "pwm");
  this.board.analogWrite(pin, value);
};

/**
 * Writes a servo value to a pin
 *
 * @param {Number} pin
 * @param {Number} value
 * @return {null}
 * @publish
 */
Adaptor.prototype.servoWrite = function(pin, value) {
  value = (value).toScale(0, 180);
  this.pinMode(pin, "servo");
  this.board.servoWrite(pin, value);
};

/**
 * Writes an I2C value to the board.
 *
 * @param {Number} address I2C address to write to
 * @param {Number} cmd I2C command to write
 * @param {Array} buff buffered data to write
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Adaptor.prototype.i2cWrite = function(address, cmd, buff, callback) {
  if (!this.i2cReady) { this.i2cConfig(2000); }
  cmd = (Array.isArray(cmd)) ? cmd : [cmd];
  this.board.sendI2CWriteRequest(address, cmd.concat(buff));
  if ("function" === typeof(callback)) { callback(); }
};

/**
 * Reads an I2C value from the board.
 *
 * @param {Number} address I2C address to write to
 * @param {Number} cmd I2C command to write
 * @param {Number} length amount of data to read
 * @param {Function} callback
 * @return {null}
 * @publish
 */
Adaptor.prototype.i2cRead = function(address, cmd, length, callback) {
  if (!this.i2cReady) {
    this.i2cConfig(2000);
  }

  // TODO: decouple read and write operations here...
  if (cmd) {
    cmd = (Array.isArray(cmd)) ? cmd : [cmd];
    this.board.sendI2CWriteRequest(address, cmd);
  }

  this.board.sendI2CReadRequest(address, length, function(data){
    var err = null;

    if (data.name === "Error") {
      err = data;
      data = null;
    }

    callback(err, data);
  });
};

Adaptor.prototype.pinMode = function(pin, mode) {
  this.board.pinMode(pin, this._convertPinMode(mode));
};

Adaptor.prototype.i2cConfig = function(delay) {
  this.board.sendI2CConfig(delay);
  this.i2cReady = true;
};

Adaptor.prototype._convertPinMode = function(mode) {
  switch (mode) {
    case "input":
      return this.board.MODES.INPUT ;
    case "output":
      return this.board.MODES.OUTPUT ;
    case "analog":
      return this.board.MODES.ANALOG ;
    case "pwm":
      return this.board.MODES.PWM ;
    case "servo":
      return this.board.MODES.SERVO ;
    default:
      return this.board.MODES.INPUT ;
  }
};
