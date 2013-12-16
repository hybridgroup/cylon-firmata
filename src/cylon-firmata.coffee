###
 * cylon-firmata
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require "cylon"

require "./firmata"
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
