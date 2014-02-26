var firmata = require('./firmata');

module.exports = {
  firmata: {
    upload: firmata.upload,
    install: firmata.install
  }
};

