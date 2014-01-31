(function() {
  var ChildProcess, firmata, os, path, sys;

  ChildProcess = require('./child_process');

  sys = require('sys');

  os = require('os');

  path = require('path');

  firmata = {
    upload: function(serialPort, hexFile) {
      var baudrate, hexPath, part, port, programmer;
      part = '-patmega328p';
      programmer = '-carduino';
      baudrate = '-b115200';
      hexPath = path.join(__dirname, "../../src/cli/hex/StandardFirmata.cpp.hex");
      hexFile = hexFile === null || hexFile === void 0 ? "-Uflash:w:" + hexPath + ":i" : hexFile;
      switch (os.platform()) {
        case 'linux':
          port = '-P/dev/' + serialPort;
          return ChildProcess.spawn('avrdude', [part, programmer, port, baudrate, '-D', hexFile]);
        case 'darwin':
          port = '-P' + serialPort;
          return ChildProcess.spawn('avrdude', [part, programmer, port, baudrate, '-D', hexFile]);
        default:
          return sys.print('OS not yet supported...\n');
      }
    },
    install: function() {
      switch (os.platform()) {
        case 'linux':
          ChildProcess.exec('sudo apt-get install avrdude');
          break;
        case 'darwin':
          ChildProcess.exec('brew install avrdude');
          break;
        default:
          sys.print('OS not yet supported...\n');
      }
      return true;
    }
  };

  module.exports = firmata;

}).call(this);
