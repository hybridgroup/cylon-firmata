require("cylon");

var os = require('os'),
    path = require('path');

module.exports = {

  upload: function(serialPort, hexFile) {
    var cylonProcess = new Cylon.Process(),
        part = '-patmega328p',
        programmer = '-carduino',
        baudrate = '-b115200',
        hexPath = path.join(__dirname, "hex/StandardFirmata.cpp.hex"),
        hexFile = (hexFile === null || hexFile === void 0) ? "-Uflash:w:" + hexPath + ":i" : hexFile,
        port = serialPort.search(/[\/\:]/) >= 0 ? "-P" + serialPort : "-P/dev/" + serialPort;

    switch (os.platform()) {
      case 'linux':
        cylonProcess.spawn('avrdude', [part, programmer, port, baudrate, '-D', hexFile]);
        break;
      case 'darwin':
        cylonProcess.spawn('avrdude', [part, programmer, port, baudrate, '-D', hexFile]);
        break;
      default:
        console.log('OS not yet supported...\n');
    }
    return true;
  },

  install: function() {
    var cylonProcess = new Cylon.Process();

    switch (os.platform()) {
      case 'linux':
        console.log("Should be installing...");
        cylonProcess.spawn('sudo', ['apt-get', 'install', 'avrdude']);
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
