###
 * Cylonjs Firmata adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

require './cylon-firmata'
LibFirmata = require('firmata')
namespace = require 'node-namespace'

namespace "Cylon.Adaptors", ->
  class @Firmata extends Cylon.Adaptor
    constructor: (opts = {}) ->
      super
      @board = ""
      @myself = this
      @i2cReady = false

    commands: ->
      [
        'pins', 'pinMode', 'digitalRead', 'digitalWrite', 'analogRead',
        'analogWrite', 'pwmWrite', 'servoWrite', 'i2cConfig', 'i2cWrite',
        'i2cRead'
      ]

    connect: (callback) ->
      @board = new LibFirmata.Board @connection.port.toString(), =>
        (callback)(null)
        @connection.emit 'connect'

      @proxyMethods @commands, @board, @myself

    disconnect: ->
      Logger.debug "Disconnecting from board '#{@name}'..."
      @board.reset()

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

    i2cWrite: (address, cmd, buff, callback = null) ->
      @_i2cConfig() unless @i2cReady
      @board.sendI2CWriteRequest address, [cmd].concat(buff)

    i2cRead: (address, cmd, length, callback = null) ->
      @_i2cConfig() unless @i2cReady
      @board.sendI2CWriteRequest address, [cmd]
      @board.sendI2CReadRequest address, length, callback

    _i2cConfig: (delay = null) ->
      @board.sendI2CConfig delay
      @i2cReady = true
