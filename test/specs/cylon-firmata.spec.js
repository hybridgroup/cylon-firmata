'use strict';

var firmata = source("cylon-firmata");

describe("Cylon.Firmata", function() {
  it("should be able to register", function() {
    firmata.register.should.be.a('function');
  });

  it("should be able to create adaptor", function() {
    expect(firmata.adaptor()).to.be.a('object');
  });
});
