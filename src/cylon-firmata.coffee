###
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

GPIO = require("cylon-gpio")

module.exports =
  adaptor: (args...) ->
    new Adaptor.Firmata(args...)

  driver: (args...) ->
    GPIO.driver(args...)

  register: (robot) ->
    Logger.debug "Registering Firmata adaptor for #{robot.name}"
    robot.registerAdaptor 'cylon-firmata', 'firmata'

    GPIO.register robot
    #Logger.debug "Registering Sphero driver for #{robot.name}"
    #robot.registerDriver 'cylon-firmata', 'led'

LibFirmata = require('firmata')

Commands = ['pins', 'pinMode', 'digitalRead', 'digitalWrite'] #, 'analogRead', 'analogWrite',
            #'servoWrite', 'sendI2CConfig', 'sendI2CWriteRequest', 'sendI2CReadRequest']

Adaptor =
  Firmata: class Firmata
    constructor: (opts) ->
      @self = this
      @connection = opts.connection
      @name = opts.name
      @board = ""

    commands: ->
      Commands

    connect: (callback) ->
      Logger.debug "Connecting to board '#{@name}'..."
      @board = new LibFirmata.Board @connection.port.toString(), =>
        @connection.emit 'connect'
        (callback)(null)

      @setupCommands()

    disconnect: ->
      Logger.debug "Disconnecting from board '#{@name}'..."
      @board.close

    digitalWrite: (pin, value) ->
      @board.pinMode pin, @board.MODES.OUTPUT
      @board.digitalWrite pin, value

    setupCommands: ->
      for command in Commands
        return if typeof @self[command] is 'function'
        @self[command] = (args...) -> @board[command](args...)

