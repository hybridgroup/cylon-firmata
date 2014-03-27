Cylon = require 'cylon'

Cylon.robot
  connection:
    name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0'

  device:
    name: 'maxbotix', driver: 'maxbotix'

  work: (my) ->
    every 1.seconds(), ->
      my.maxbotix.range (data) ->
        Logger.info "range: #{data}"

.start()
