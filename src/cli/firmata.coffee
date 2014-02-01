ChildProcess = require('./child_process')
os = require('os')
path = require('path')

firmata =
  upload: (serialPort, hexFile) ->
    part = '-patmega328p'
    programmer = '-carduino'
    baudrate = '-b115200'
    hexPath = path.join __dirname, "../../src/cli/hex/StandardFirmata.cpp.hex"
    hexFile = if (hexFile == null || hexFile == undefined) then "-Uflash:w:#{ hexPath }:i" else hexFile

    switch(os.platform())
      when 'linux'
        port = '-P/dev/' + serialPort
        ChildProcess.spawn('avrdude', [part, programmer, port, baudrate, '-D', hexFile])
      when 'darwin'
        port = '-P' + serialPort
        ChildProcess.spawn('avrdude', [part, programmer, port, baudrate, '-D', hexFile])
      else
        console.log('OS not yet supported...\n')

  install: ->
    switch(os.platform())
      when 'linux'
        ChildProcess.exec('sudo apt-get install avrdude')
      when 'darwin'
        ChildProcess.exec('brew install avrdude')
      else
        console.log('OS not yet supported...\n')
    true

module.exports = firmata
