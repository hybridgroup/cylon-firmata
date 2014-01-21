(function() {
  'use strict';
  require('cylon');

  source('firmata');

  Logger.setup(false);

  describe('Cylon.Adaptors.Firmata', function() {
    describe('initialization', function() {
      it('sets @myself as a reference to the Firmata instance', function() {
        var firmata;
        firmata = new Cylon.Adaptors.Firmata;
        return firmata.myself.should.be.eql(firmata);
      });
      it('sets @connection to the provided connection', function() {
        var firmata;
        firmata = new Cylon.Adaptors.Firmata({
          connection: "testConnection"
        });
        return firmata.connection.should.be.eql("testConnection");
      });
      it('sets @name to the provided name', function() {
        var firmata;
        firmata = new Cylon.Adaptors.Firmata({
          name: "TestFirmata"
        });
        return firmata.name.should.be.eql("TestFirmata");
      });
      return it('sets @board to an empty string by default', function() {
        var firmata;
        firmata = new Cylon.Adaptors.Firmata;
        return firmata.board.should.be.eql("");
      });
    });
    describe('#commands', function() {
      return it('returns an array of Firmata method names', function() {
        var firmata;
        firmata = new Cylon.Adaptors.Firmata;
        return firmata.commands().should.be.a('array');
      });
    });
    describe('#gpio', function() {
      it('digitalRead');
      it('digitalWrite');
      it('analogRead');
      it('analogWrite');
      it('pwmWrite');
      return it('servoWrite');
    });
    return describe('#i2c', function() {
      it('i2cRead');
      return it('i2cWrite');
    });
  });

}).call(this);
