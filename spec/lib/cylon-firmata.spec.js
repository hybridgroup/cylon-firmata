/* jshint expr:true */
"use strict";

var Adaptor = source("firmata");

var firmata = source("../");

describe("cylon-firmata", function() {
  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(firmata.adaptors).to.be.eql(["firmata"]);
    });
  });

  describe("#dependencies", function() {
    it("is an array of supplied dependencies", function() {
      expect(firmata.dependencies).to.be.eql(["cylon-gpio", "cylon-i2c"]);
    });
  });

  describe("#adaptor", function() {
    it("returns a new adaptor instance", function() {
      expect(firmata.adaptor({port: ""})).to.be.an.instanceOf(Adaptor);
    });
  });
});
