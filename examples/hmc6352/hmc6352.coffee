Cylon = require 'cylon'

Cylon.robot
  connection:
    name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0'

  device:
    name: 'hmc6352', driver: 'hmc6352'

  work: (my) ->
    every 1.second(), ->
      my.hmc6352.heading((data) ->
        Logger.info "heading: #{data}"
      )

.start()
