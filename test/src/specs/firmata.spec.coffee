'use strict'

require 'cylon'

source 'firmata'

Logger.setup false

describe 'Cylon.Adaptors.Firmata', ->
  spy = sinon.spy

  describe 'initialization', ->
    it 'sets @myself as a reference to the Firmata instance', ->
      firmata = new Cylon.Adaptors.Firmata
      firmata.myself.should.be.eql firmata

    it 'sets @connection to the provided connection', ->
      firmata = new Cylon.Adaptors.Firmata { connection: "testConnection" }
      firmata.connection.should.be.eql "testConnection"

    it 'sets @name to the provided name', ->
      firmata = new Cylon.Adaptors.Firmata { name: "TestFirmata" }
      firmata.name.should.be.eql "TestFirmata"

    it 'sets @board to an empty string by default', ->
      firmata = new Cylon.Adaptors.Firmata
      firmata.board.should.be.eql ""

  describe '#commands', ->
    it 'returns an array of Firmata method names', ->
      firmata = new Cylon.Adaptors.Firmata
      firmata.commands().should.be.a 'array'

  describe '#gpio', ->
    firmata = new Cylon.Adaptors.Firmata

    it 'digitalRead', ->
      board = { MODES: { INPUT: 0 }, pinMode: spy(), digitalRead: spy() }

      firmata.board = board
      firmata.digitalRead(3, ->)

      assert board.pinMode.calledOnce
      assert board.pinMode.calledWith 3, 0

      assert board.digitalRead.calledOnce
      assert board.digitalRead.calledWith 3

    it 'digitalWrite', ->
      board = { MODES: { OUTPUT: 1 }, pinMode: spy(), digitalWrite: spy() }

      firmata.board = board
      firmata.digitalWrite(3, 1)

      assert board.pinMode.calledOnce
      assert board.pinMode.calledWith 3, 1

      assert board.digitalWrite.calledOnce
      assert board.digitalWrite.calledWith 3, 1

    it 'analogRead', ->
      board = { analogRead: spy() }
      callback = ->
      firmata.board = board

      firmata.analogRead(3, callback)

      assert board.analogRead.calledOnce
      assert board.analogRead.calledWith 3, callback

    it 'analogWrite', ->
      board = {
        MODES: { ANALOG: 1 }
        pinMode: spy()
        analogPins: { 3: 'pin' }
        analogWrite: spy()
      }

      firmata.board = board
      firmata.analogWrite(3, 1)

      assert board.pinMode.calledOnce
      assert board.pinMode.calledWith 'pin', 1

      assert board.analogWrite.calledOnce
      assert board.analogWrite.calledWith 'pin', 1

    it 'pwmWrite', ->
      board = { MODES: { PWM: 'PWM' }, analogWrite: spy(), pinMode: spy() }
      firmata.board = board
      firmata.pwmWrite(3, 'hello')

      assert board.pinMode.calledOnce
      assert board.pinMode.calledWith 3, 'PWM'

      assert board.analogWrite.calledOnce
      assert board.analogWrite.calledWith 3, 'hello'

    it 'servoWrite', ->
      board = { MODES: { SERVO: 'servo' }, analogWrite: spy(), pinMode: spy() }
      firmata.board = board
      firmata.servoWrite(3, 'hello')

      assert board.pinMode.calledOnce
      assert board.pinMode.calledWith 3, 'servo'

      assert board.analogWrite.calledOnce
      assert board.analogWrite.calledWith 3, 'hello'

  describe '#i2c', ->
    it 'i2cRead'
    it 'i2cWrite'
