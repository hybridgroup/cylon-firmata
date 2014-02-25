'use strict';

require('cylon');
source('firmata');

Logger.setup(false);

describe('Cylon.Adaptors.Firmata', function() {
  var spy;
  spy = sinon.spy;
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
    var firmata;
    firmata = new Cylon.Adaptors.Firmata;
    it('digitalRead', function() {
      var board;
      board = {
        MODES: {
          INPUT: 0
        },
        pinMode: spy(),
        digitalRead: spy()
      };
      firmata.board = board;
      firmata.digitalRead(3, function() {});
      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith(3, 0));
      assert(board.digitalRead.calledOnce);
      return assert(board.digitalRead.calledWith(3));
    });
    it('digitalWrite', function() {
      var board;
      board = {
        MODES: {
          OUTPUT: 1
        },
        pinMode: spy(),
        digitalWrite: spy()
      };
      firmata.board = board;
      firmata.digitalWrite(3, 1);
      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith(3, 1));
      assert(board.digitalWrite.calledOnce);
      return assert(board.digitalWrite.calledWith(3, 1));
    });
    it('analogRead', function() {
      var board, callback;
      board = {
        analogRead: spy()
      };
      callback = function() {};
      firmata.board = board;
      firmata.analogRead(3, callback);
      assert(board.analogRead.calledOnce);
      return assert(board.analogRead.calledWith(3, callback));
    });
    it('analogWrite', function() {
      var board;
      board = {
        MODES: {
          ANALOG: 1
        },
        pinMode: spy(),
        analogPins: {
          3: 'pin'
        },
        analogWrite: spy()
      };
      firmata.board = board;
      firmata.analogWrite(3, 1);
      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith('pin', 1));
      assert(board.analogWrite.calledOnce);
      return assert(board.analogWrite.calledWith('pin', 1));
    });
    it('pwmWrite', function() {
      var board;
      board = {
        MODES: {
          PWM: 'PWM'
        },
        analogWrite: spy(),
        pinMode: spy()
      };
      firmata.board = board;
      firmata.pwmWrite(3, 'hello');
      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith(3, 'PWM'));
      assert(board.analogWrite.calledOnce);
      return assert(board.analogWrite.calledWith(3, 'hello'));
    });
    return it('servoWrite', function() {
      var board;
      board = {
        MODES: {
          SERVO: 'servo'
        },
        analogWrite: spy(),
        pinMode: spy()
      };
      firmata.board = board;
      firmata.servoWrite(3, 'hello');
      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith(3, 'servo'));
      assert(board.analogWrite.calledOnce);
      return assert(board.analogWrite.calledWith(3, 'hello'));
    });
  });
  return describe('#i2c', function() {
    var firmata;
    firmata = new Cylon.Adaptors.Firmata;
    it('i2cRead', function() {
      var board, callback, i2cconfig;
      i2cconfig = firmata._i2cConfig = spy();
      firmata.i2cReady = false;
      board = {
        sendI2CReadRequest: spy(),
        sendI2CWriteRequest: spy()
      };
      callback = function() {};
      firmata.board = board;
      firmata.i2cRead('address', 'command', 10, callback);
      assert(i2cconfig.calledOnce);
      assert(board.sendI2CWriteRequest.calledOnce);
      assert(board.sendI2CWriteRequest.calledWith('address', ['command']));
      assert(board.sendI2CReadRequest.calledOnce);
      return assert(board.sendI2CReadRequest.calledWith('address', 10, callback));
    });
    return it('i2cWrite', function() {
      var board, i2cconfig;
      i2cconfig = firmata._i2cConfig = spy();
      firmata.i2cReady = false;
      board = {
        sendI2CWriteRequest: spy()
      };
      firmata.board = board;
      firmata.i2cWrite('address', 'command', ['buffer']);
      assert(i2cconfig.calledOnce);
      assert(board.sendI2CWriteRequest.calledOnce);
      return assert(board.sendI2CWriteRequest.calledWith('address', ['command', 'buffer']));
    });
  });
});
