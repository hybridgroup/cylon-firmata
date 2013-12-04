'use strict'

require 'cylon'

source 'firmata'

Logger.setup false

describe 'Cylon.Adaptor.Firmata', ->

  describe 'initialization', ->
    it 'sets @myself as a reference to the Firmata instance', ->
      firmata = new Cylon.Adaptor.Firmata
      firmata.myself.should.be.eql firmata

    it 'sets @connection to the provided connection', ->
      firmata = new Cylon.Adaptor.Firmata { connection: "testConnection" }
      firmata.connection.should.be.eql "testConnection"

    it 'sets @name to the provided name', ->
      firmata = new Cylon.Adaptor.Firmata { name: "TestFirmata" }
      firmata.name.should.be.eql "TestFirmata"

    it 'sets @board to an empty string by default', ->
      firmata = new Cylon.Adaptor.Firmata
      firmata.board.should.be.eql ""

  describe '#commands', ->
    it 'returns an array of Firmata method names', ->
      firmata = new Cylon.Adaptor.Firmata
      firmata.commands().should.be.a 'array'
