'use strict';

var Adaptor = source('firmata');

var module = source('cylon-firmata');

describe('cylon-firmata', function() {
  describe("#adaptors", function() {
    it('is an array of supplied adaptors', function() {
      expect(module.adaptors).to.be.eql(['firmata']);
    });
  });

  describe("#dependencies", function() {
    it('is an array of supplied dependencies', function() {
      expect(module.dependencies).to.be.eql(['cylon-gpio', 'cylon-i2c']);
    });
  });

  describe("#adaptor", function() {
    it("returns a new adaptor instance", function() {
      expect(module.adaptor({})).to.be.an.instanceOf(Adaptor);
    });
  });
});
