ChildProcess = require('./child_process')
sys = require('sys')
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
        sys.print('OS not yet supported...\n')

module.exports = firmata
