(function() {
  var cliCommands, firmata;

  firmata = require('./firmata');

  cliCommands = {
    firmata: {
      upload: firmata.upload
    }
  };

  module.exports = cliCommands;

}).call(this);
