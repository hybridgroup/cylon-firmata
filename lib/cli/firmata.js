var namespace = require('node-namespace'),
    path = require('path');

namespace('Cylon.CLI', function() {
  this.Firmata = (function() {
    function Firmata(serialPort, hexFile) {
      this.arduino = new Cylon.CLI.Arduino();
      this.bkpHexFile = path.join(__dirname, "hex/StandardFirmata.cpp.hex");
      this.hexFile = (hexFile === null || hexFile === void 0) ? this.bkpHexFile : hexFile;
      this.serialPort = serialPort;
    }

    Firmata.prototype.upload = function() {
      if ((this.serialPort != null) && (typeof(this.serialPort)))
        this.arduino.upload(this.serialPort, this.hexFile);
      else
        Logger.error("Please specify a serial port address.");
    };

    Firmata.prototype.install = function() {
      this.arduino.install();
    };

    return Firmata;

  })();
});
