"use strict";

var Adaptor = require("./lib/firmata");

module.exports = {
  adaptors: ["firmata"],
  dependencies: ["cylon-gpio", "cylon-i2c"],

  adaptor: function(args) {
    return new Adaptor(args);
  }
};
