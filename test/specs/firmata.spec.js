'use strict';

source('firmata');

describe('Cylon.Adaptors.Firmata', function() {
  var firmata = new Cylon.Adaptors.Firmata({
    name: "TestFirmata",
    connection: "testConnection"
  });

  describe('initialization', function() {
    it('sets @myself as a reference to the Firmata instance', function() {
      expect(firmata.myself).to.be.eql(firmata);
    });

    it('sets @connection to the provided connection', function() {
      expect(firmata.connection).to.be.eql("testConnection");
    });

    it('sets @name to the provided name', function() {
      expect(firmata.name).to.be.eql("TestFirmata");
    });

    it('sets @board to an empty string by default', function() {
      expect(firmata.board).to.be.eql("");
    });
  });

  describe('#commands', function() {
    it('returns an array of Firmata method names', function() {
      expect(firmata.commands()).to.be.a('array');
    });
  });

  describe('#gpio', function() {
    it('digitalRead', function() {
      var board = {
        MODES: { INPUT: 0 },
        pinMode: spy(),
        digitalRead: spy()
      };

      firmata.board = board;
      firmata.digitalRead(3, function() {});

      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith(3, 0));
      assert(board.digitalRead.calledOnce);
      assert(board.digitalRead.calledWith(3));
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
      assert(board.digitalWrite.calledWith(3, 1));
    });

    it('analogRead', function() {
      var board = { analogRead: spy() };
      var callback = function() {};

      firmata.board = board;
      firmata.analogRead(3, callback);

      assert(board.analogRead.calledOnce);
      assert(board.analogRead.calledWith(3, callback));
    });

    it('analogWrite', function() {
      var board = {
        MODES: { ANALOG: 1 },
        pinMode: spy(),
        analogPins: { 3: 'pin' },
        analogWrite: spy()
      };

      firmata.board = board;
      firmata.analogWrite(3, 1);

      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith('pin', 1));
      assert(board.analogWrite.calledOnce);
      assert(board.analogWrite.calledWith('pin', 1));
    });

    it('pwmWrite', function() {
      var board = {
        MODES: { PWM: 'PWM' },
        analogWrite: spy(),
        pinMode: spy()
      };

      firmata.board = board;
      firmata.pwmWrite(3, 'hello');

      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith(3, 'PWM'));
      assert(board.analogWrite.calledOnce);
      assert(board.analogWrite.calledWith(3, 'hello'));
    });

    it('servoWrite', function() {
      var board = {
        MODES: { SERVO: 'servo' },
        analogWrite: spy(),
        pinMode: spy()
      };

      firmata.board = board;
      firmata.servoWrite(3, 'hello');

      assert(board.pinMode.calledOnce);
      assert(board.pinMode.calledWith(3, 'servo'));
      assert(board.analogWrite.calledOnce);
      assert(board.analogWrite.calledWith(3, 'hello'));
    });
  });

  describe('#i2c', function() {
    it('i2cRead', function() {
      var i2cconfig = firmata._i2cConfig = spy();
      var board = { sendI2CReadRequest: spy(), sendI2CWriteRequest: spy() };
      var callback = sinon.spy();

      firmata.i2cReady = false;
      firmata.board = board;
      firmata.i2cRead('address', 'command', 10, callback);

      assert(i2cconfig.calledOnce);
      assert(board.sendI2CWriteRequest.calledOnce);
      assert(board.sendI2CWriteRequest.calledWith('address', ['command']));
      assert(board.sendI2CReadRequest.calledOnce);
      // TODO: Add assert for callback to make sure it is being called
      // inside the anonymus function being passed as a callback to `board.sendI2CReadRequest`
      //assert(callback.calledOnce);
    });

    it('i2cWrite', function() {
      var i2cconfig = firmata._i2cConfig = spy();
      var board = { sendI2CWriteRequest: spy() };

      firmata.i2cReady = false;
      firmata.board = board;
      firmata.i2cWrite('address', 'command', ['buffer']);

      assert(i2cconfig.calledOnce);
      assert(board.sendI2CWriteRequest.calledOnce);
      assert(board.sendI2CWriteRequest.calledWith('address', ['command', 'buffer']));
    });
  });
});
