###
 * Cylonjs Firmata adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

LibFirmata = require('firmata')
namespace = require 'node-namespace'

namespace "Cylon.Adaptor", ->
  class @Firmata extends Cylon.Basestar
    constructor: (opts) ->
      super
      @connection = opts.connection
      @name = opts.name
      @board = ""

    commands: ->
      ['pins', 'pinMode', 'digitalRead', 'digitalWrite', 'analogRead', 'analogWrite', 'pwmWrite', 'servoWrite',
       'i2cConfig', 'i2cWrite', 'i2cRead']

    connect: (callback) ->
      Logger.debug "Connecting to board '#{@name}'..."
      @board = new LibFirmata.Board @connection.port.toString(), =>
        (callback)(null)
        @connection.emit 'connect'

      @proxyMethods @commands, @board, Firmata

    disconnect: ->
      Logger.debug "Disconnecting from board '#{@name}'..."
      @board.close

    digitalRead: (pin, callback) ->
      @board.pinMode pin, @board.MODES.INPUT
      @board.digitalRead pin, callback

    digitalWrite: (pin, value) ->
      @board.pinMode pin, @board.MODES.OUTPUT
      @board.digitalWrite pin, value

    analogRead: (pin, callback) ->
      @board.analogRead(pin, callback)

    analogWrite: (pin, value) ->
      @board.pinMode @board.analogPins[pin], @board.MODES.ANALOG
      @board.analogWrite @board.analogPins[pin], value

    pwmWrite: (pin, value) ->
      @board.pinMode pin, @board.MODES.PWM
      @board.analogWrite pin, value

    servoWrite: (pin, value) ->
      @board.pinMode pin, @board.MODES.SERVO
      @board.analogWrite pin, value

    i2cConfig: (delay) ->
      @board.sendI2CConfig delay

    i2cWrite: (address, data) ->
      @board.sendI2CWriteRequest address, data

    i2cRead: (address, length, callback) ->
      @board.sendI2CReadRequest address, length, callback
