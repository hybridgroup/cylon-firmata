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
  class @Firmata
    constructor: (opts) ->
      @self = this
      @connection = opts.connection
      @name = opts.name
      @board = ""

    commands: ->
      ['pins', 'pinMode', 'digitalRead', 'digitalWrite', 'analogRead', 'analogWrite']
      #'servoWrite', 'sendI2CConfig', 'sendI2CWriteRequest', 'sendI2CReadRequest']

    connect: (callback) ->
      Logger.debug "Connecting to board '#{@name}'..."
      @board = new LibFirmata.Board @connection.port.toString(), =>
        @connection.emit 'connect'
        (callback)(null)

      @setupCommands()

    disconnect: ->
      Logger.debug "Disconnecting from board '#{@name}'..."
      @board.close

    digitalRead: (pin) ->
      @board.pinMode pin, @board.MODES.INPUT
      @board.digitalRead pin

    digitalWrite: (pin, value) ->
      @board.pinMode pin, @board.MODES.OUTPUT
      @board.digitalWrite pin, value

    setupCommands: ->
      for command in Commands
        return if typeof @self[command] is 'function'
        @self[command] = (args...) -> @board[command](args...)
