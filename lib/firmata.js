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
 * @constructor firmata
 *
 * @param {Object} opts options
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

/**
 * Connects to the Firmata-compatible board
 *
 * @param {Function} callback to be triggered when connected
 * @return {void}
 */
Adaptor.prototype.connect = function(callback) {
  this.board = new Firmata.Board(this.port, function(err) {
    if (err) { return callback(err); }
    this.respond("connect", callback);
  }.bind(this));
};

/**
 * Disconnects from the Firmata-compatible board
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {void}
 */
Adaptor.prototype.disconnect = function(callback) {
  this.board.reset();
  this.respond("disconnect", callback);
};

/**
 * Reads a value from a digital pin
 *
 * @param {Number} pin which pin to read from
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {void}
 * @publish
 */
Adaptor.prototype.digitalRead = function(pin, callback) {
  this.pinMode(pin, "input");

  this.board.digitalRead(pin, function(value) {
    this.respond("digitalRead", callback, null, value, pin);
  }.bind(this));
};

/**
 * Writes a value to a digital pin
 *
 * @param {Number} pin which pin to write to
 * @param {Number} value the value to write to the pin
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.digitalWrite = function(pin, value, callback) {
  this.pinMode(pin, "output");
  this.board.digitalWrite(pin, value);
  this.respond("digitalWrite", callback, null, value, pin);
};

/**
 * Reads a value from an analog pin
 *
 * @param {Number} pin which pin to read from
 * @param {Function} callback triggered when the value has been read from the
 * pin
 * @return {void}
 * @publish
 */
Adaptor.prototype.analogRead = function(pin, callback) {
  this.board.analogRead(pin, function(value) {
    this.respond("analogRead", callback, null, value, pin);
  }.bind(this));
};

/**
 * Writes a value to an analog pin
 *
 * @param {Number} pin which pin to write to
 * @param {Number} value the analog value to write to the pin
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.analogWrite = function(pin, value, callback) {
  value = (value).toScale(0, 255);
  this.pinMode(this.board.analogPins[pin], "analog");
  this.board.analogWrite(this.board.analogPins[pin], value);
  this.respond("analogWrite", callback, null, value, pin);
};

/**
 * Writes a PWM value to a pin
 *
 * @param {Number} pin which pin to write a value to
 * @param {Number} value 0..1 value to write to the pin
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.pwmWrite = function(pin, value, callback) {
  value = (value).toScale(0, 255);
  this.pinMode(pin, "pwm");
  this.board.analogWrite(pin, value);
  this.respond("pwmWrite", callback, null, value, pin);
};

/**
 * Writes a servo value to a pin
 *
 * @param {Number} pin pin to write a value to
 * @param {Number} value servo value to write, from 0..1
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.servoWrite = function(pin, value, callback) {
  value = (value).toScale(0, 180);
  this.pinMode(pin, "servo");
  this.board.servoWrite(pin, value);
  this.respond("servoWrite", callback, null, value, pin);
};

/**
 * Writes an I2C value to the board.
 *
 * @param {Number} address I2C address to write to
 * @param {Number} cmd I2C command to write
 * @param {Array} buff buffered data to write
 * @param {Function} callback function to be invoked when write is complete
 * @return {void}
 * @publish
 */
Adaptor.prototype.i2cWrite = function(address, cmd, buff, callback) {
  if (!this.i2cReady) { this.i2cConfig(2000); }
  cmd = (Array.isArray(cmd)) ? cmd : [cmd];
  this.board.sendI2CWriteRequest(address, cmd.concat(buff));
  this.respond("i2cWrite", callback);
};

/**
 * Reads an I2C value from the board.
 *
 * @param {Number} address I2C address to write to
 * @param {Number} cmd I2C command to write
 * @param {Number} length amount of data to read
 * @param {Function} callback function to be invoked when values are read
 * @return {void}
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

  this.board.sendI2CReadRequest(address, length, function(data) {
    var err = null;

    if (data.name === "Error") {
      err = data;
      data = null;
    }

    this.respond("i2cRead", callback, err, data);
  }.bind(this));
};

/**
 * Send a SYSEX command to the board.
 *
 * @param {Array} cmds bytes to write to board
 * @return {void}
 * @publish
 */
Adaptor.prototype.sysexCommand = function(cmds) {
  this.board.sysexCommand(cmds);
};

/**
 * Listen for SYSEX responses coming from the board.
 *
 * @param {Number} cmd SYSEX command to write
 * @param {Function} callback function to be invoked when values are read
 * @return {void}
 * @publish
 */
Adaptor.prototype.sysexResponse = function(cmd, callback) {
  this.board.sysexResponse(cmd, callback);
};

/**
 * Decode an array of 7 bit bytes into 8-bit ones.
 *
 * @param {Array} data data to decode
 * @return {Array} decoded data
 * @publish
 */
Adaptor.prototype.decode = function(data) {
  return Firmata.decode(data);
};

Adaptor.prototype.pinMode = function(pin, mode) {
  this.board.pinMode(pin, this._convertPinMode(mode));
};

Adaptor.prototype.i2cConfig = function(delay) {
  this.board.sendI2CConfig(delay);
  this.i2cReady = true;
};

Adaptor.prototype._convertPinMode = function(mode) {
  return this.board.MODES[mode.toUpperCase()] || this.board.MODES.INPUT;
};

/**
 * Configure the pin as the controller in a 1-wire bus.
 *
 * @param {Number} pin Pin to be configured.
 * @param {Boolean} enableParasiticPower Set to true if you want the data pin
 * to power the bus.
 * @return {void}
 * @publish
 */
Adaptor.prototype.sendOneWireConfig = function(pin, enableParasiticPower) {
  this.board.sendOneWireConfig(pin, enableParasiticPower);
};

/**
 * Searches for 1-wire devices on the bus.
 *
 * @param {Number} pin Pin where search will be done.
 * @param {Function} callback Function to be invoked when search is completed.
 * Should accept an error argument and an array of device identifiers.
 * @return {void}
 * @publish
 */
Adaptor.prototype.sendOneWireSearch = function(pin, callback) {
  this.board.sendOneWireSearch(pin, function(err, devices) {
    this.respond("oneWireSearch", callback, err, devices);
  }.bind(this));
};

/**
 * Searches for 1-wire devices on the bus in an alarmed state.
 *
 * @param {Number} pin Pin where the operation will be conducted.
 * @param {Function} callback Function to be invoked when search is completed.
 * Should accept an error argument and an array of device identifiers.
 * @return {void}
 * @publish
 */
Adaptor.prototype.sendOneWireAlarmsSearch = function(pin, callback) {
  this.board.sendOneWireAlarmsSearch(pin, function(err, devices) {
    this.respond("oneWireAlarmsSearch", callback, err, devices);
  }.bind(this));
};

/**
 * Reads data from a device on the bus.
 *
 * @param {Number} pin Pin where the operation will be conducted.
 * @param {Number[]} device Valid device identifier, as returned by
 * sendOneWireSearch.
 * @param {Number} numBytesToRead Number of bytes to read.
 * @param {Function} callback Function to be invoked when operation is
 * completed.
 * @return {void}
 * @publish
 */
Adaptor.prototype.sendOneWireRead =
  function(pin, device, numBytesToRead, callback) {
    this.board.sendOneWireRead(pin, device, numBytesToRead,
      function(err, data) {
        this.respond("oneWireRead", callback, err, data);
      }.bind(this));
  };

/**
 * Resets all devices on the bus.
 *
 * @param {Number} pin Pin where the operation will be conducted.
 * @return {void}
 * @publish
 */
Adaptor.prototype.sendOneWireReset = function(pin) {
  this.board.sendOneWireReset(pin);
};

/**
 * Writes data to the bus to be received by the device.
 *
 * @param {Number} pin Pin where the operation will be conducted.
 * @param {Number[]} device Valid device identifier, as returned by
 * sendOneWireSearch.
 * @param {Number} data Hexadecimal to be sent to the device. Will typically
 * represent an operation/instruction for the device.
 * @return {void}
 * @publish
 */
Adaptor.prototype.sendOneWireWrite = function(pin, device, data) {
  this.board.sendOneWireWrite(pin, device, data);
};

/**
 * Tells Firmata to not do anything for the amount of ms.
 * Use when you need to give a device attached to the bus time to do a
 * calculation.
 *
 * @param {Number} pin Pin where the operation will be conducted.
 * @param {Number} delay Duration of the delay, in milliseconds.
 * @return {void}
 * @publish
 */
Adaptor.prototype.sendOneWireDelay = function(pin, delay) {
  this.board.sendOneWireDelay(pin, delay);
};

/**
 * Sends the data to the device on the bus and reads the specified number of
 * bytes.
 *
 * @param {Number} pin Pin where the operation will be conducted.
 * @param {Number[]} device Valid device identifier, as returned by
 * sendOneWireSearch.
 * @param {Number} data Hexadecimal to be sent to the device. Will typically
 * represent an operation/instruction for the device.
 * @param {Number} numBytesToRead Number of bytes to read.
 * @param {Function} callback Function to be invoked when operation is
 * completed.
 * @return {void}
 * @publish
 */
Adaptor.prototype.sendOneWireWriteAndRead =
  function(pin, device, data, numBytesToRead, callback) {
    this.board.sendOneWireWriteAndRead(pin, device, data, numBytesToRead,
      function(err, responseData) {
        this.respond("oneWireWriteAndRead", callback, err, responseData);
      }.bind(this));
  };
