(function() {
  var firmata, os, path;

  require("cylon");

  os = require('os');

  path = require('path');

  firmata = {
    upload: function(serialPort, hexFile) {
      var baudrate, cylonProcess, hexPath, part, port, programmer;
      cylonProcess = new Cylon.Process;
      part = '-patmega328p';
      programmer = '-carduino';
      baudrate = '-b115200';
      hexPath = path.join(__dirname, "../../src/cli/hex/StandardFirmata.cpp.hex");
      hexFile = hexFile === null || hexFile === void 0 ? "-Uflash:w:" + hexPath + ":i" : hexFile;
      switch (os.platform()) {
        case 'linux':
          port = '-P/dev/' + serialPort;
          return cylonProcess.spawn('avrdude', [part, programmer, port, baudrate, '-D', hexFile]);
        case 'darwin':
          port = '-P' + serialPort;
          return cylonProcess.spawn('avrdude', [part, programmer, port, baudrate, '-D', hexFile]);
        default:
          return console.log('OS not yet supported...\n');
      }
    },
    install: function() {
      var cylonProcess;
      cylonProcess = new Cylon.Process;
      switch (os.platform()) {
        case 'linux':
          cylonProcess.exec('sudo apt-get install avrdude');
          break;
        case 'darwin':
          cylonProcess.exec('brew install avrdude');
          break;
        default:
          console.log('OS not yet supported...\n');
      }
      return true;
    }
  };

  module.exports = firmata;

}).call(this);
