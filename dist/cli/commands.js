(function() {
  var cliCommands, firmata;

  firmata = require('./firmata');

  cliCommands = {
    firmata: {
      upload: firmata.upload,
      install: firmata.install
    }
  };

  module.exports = cliCommands;

}).call(this);
