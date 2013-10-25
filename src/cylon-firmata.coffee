###
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

module.exports =
  adaptor: (args...) ->
    new Adaptor.Firmata(args...)

  driver: (args...) ->
    new Driver.Led(args...)

  register: (robot) ->
    Logger.info "Registering Firmata adaptor for #{robot.name}"
    robot.registerAdaptor 'cylon-firmata', 'firmata'

    Logger.info "Registering Sphero driver for #{robot.name}"
    robot.registerDriver 'cylon-firmata', 'led'

Firmata = require('firmata')

Commands = ['pins', 'pinMode', 'digitalRead', 'digitalWrite', 'analogRead', 'analogWrite',
            'servoWrite', 'sendI2CConfig', 'sendI2CWriteRequest', 'sendI2CReadRequest']

Adaptor =
  Firmata: class Firmata
    constructor: (opts) ->
      @self = this
      @connection = opts.connection
      @name = opts.name

    connect: (connection) ->
      @connection = connection
      Logger.info "Connecting to board '#{@name}'..."
      @board = Firmata.board(@connection.port.toString()) ->
        @connection.emit 'connect'

      @setupCommands()
      @self

    disconnect: ->
      Logger.info "Disconnecting from board '#{@name}'..."
      @board.close

    setupCommands: ->
      for command in Commands
        return if typeof @self[command] is 'function'
        @self[command] = (args...) -> @board[command](args...)

Driver =
  Led: class Led
    constructor: (opts) ->
      @self = this
      @device = opts.device
      @connection = @device.connection
      @pin = opts.pin
      @isOn = false
      #@setupCommands()

    start: ->
      Logger.info "started"

      # @connection.on 'message', (data) =>
      #   @device.emit 'message', @self, data

      # @connection.on 'notification', (data) =>
      #   @device.emit 'notification', @self, data

    # setupCommands: ->
    #   for command in Commands
    #     return if typeof @self[command] is 'function'
    #     @self[command] = (args...) -> @connection[command](args...)

    turnOn: ->
      @isOn = true
      @connection.digitalWrite(@pin, 1)

    turnOff: ->
      @isOn = false
      @connection.digitalWrite(@pin, 0)

    toggle: ->
      if @isOn
        turnOff()
      else
        turnOn()
