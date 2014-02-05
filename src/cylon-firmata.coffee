###
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict'

require "cylon"
require "./firmata"
CliCommands = require "./cli/commands"
GPIO = require "cylon-gpio"
I2C = require "cylon-i2c"

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptors.Firmata(args...)

  driver: (args...) ->
    GPIO.driver(args...) or I2C.driver(args...)

  register: (robot) ->
    Logger.debug "Registering Firmata adaptor for #{robot.name}"
    robot.registerAdaptor 'cylon-firmata', 'firmata'

    GPIO.register robot
    I2C.register robot

  registerCommands: ->
    firmata:
      description: "Upload firmata protocol to arduino"
      command: (args) ->
        subcmd = args[0]
        address = args[1]
        hexFile = if args.length > 2 then args[2] else null

        switch(subcmd)
          when 'upload'
            CliCommands.firmata.upload(address, hexFile)
          when 'install'
            CliCommands.firmata.install()
          else
            console.log("cylon firmata argument not recognized, try:\n")
            console.log("1.- cylon firmata upload <serial_address>")
            console.log("2.- cylon firmata install\n")
