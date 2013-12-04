# Cylon.js For Firmata

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an adaptor for microcontrollers such as Arduino that support the Firmata protocol (http://www.gosphero.com/). It uses the Firmata node module (https://github.com/jgautier/firmata) created by [@jgautier](https://github.com/jgautier) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-firmata.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-firmata)

## Getting Started
Install the module with: `npm install cylon-firmata`

## Examples

### JavaScript:
```javascript
var Cylon = require('cylon');

// Initialize the robot
Cylon.robot({
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },
  devices: [{name: 'led', driver: 'led', pin: 13},
            {name: 'button', driver: 'button', pin: 2}],

  work: function(my) {
    my.button.on('push', function() {my.led.toggle()});
  }
}).start();
```

### CoffeeScript:
```
Cylon = require('cylon')

# Initialize the robot
Cylon.robot
  connection:
    name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0'

  devices:
    [
      {name: 'led', driver: 'led', pin: 13},
      {name: 'button', driver: 'button', pin: 2}
    ]

  work: (my) ->
    my.button.on 'push', -> my.led.toggle()

.start()
```

## Documentation
We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

[![NPM](https://nodei.co/npm/cylon-firmata.png?compact=true)](https://nodei.co/npm/cylon-firmata/)

Version 0.6.0 - Updates to Cylon 0.7.0

Version 0.5.0 - Updates to Cylon 0.6.0

Version 0.4.0 - Updates to latest cylon core

Version 0.3.0 - Add support for i2c, load cylon-i2c driver set

Version 0.2.0 - Add support for PWM and servo commands, and refactor to use Basestar

Version 0.1.0 - Initial release with support for digital read/write and analog read/write

## License
Copyright (c) 2013 The Hybrid Group. Licensed under the Apache 2.0 license.
