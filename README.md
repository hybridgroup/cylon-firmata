# Cylon.js for Firmata

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an adaptor for microcontrollers such as the Arduino that support the [Firmata protocol][Firmata].
This is possible thanks to the [`firmata` module](https://github.com/jgautier/firmata).

[Firmata]: http://firmata.org/wiki/Main_Page

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

## How to Install

To get started, just install the NPM module:

    $ npm install cylon-firmata

## How to Use

This quick example blinks an LED connected to an Arduino once per second:

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/ttyACM0' }
  },

  devices: {
    led: { driver: 'led', pin: 13 }
  },

  work: function(my) {
    every((1).second(), my.led.toggle);
  }
}).start();
```

## How to Connect

### Upload the Firmata Firmware to the Arduino

This section assumes you're using an Arduino Uno or another compatible board, and a UNIX operating system (OS X or Linux). If you already have the Firmata sketch installed, you can skip straight to the examples.

### OS X

First plug the Arduino into your computer via the USB/serial port.
A dialog box will appear telling you that a new network interface has been detected.
Click "Network Preferences...", and when it opens, simply click "Apply".

Install the cylon-firmata module:

    $ npm install cylon-firmata

Once plugged in, use [Gort](http://gort.io)'s `gort scan serial` command to find out your connection info and serial port address:

    $ gort scan serial

Use the `gort firmata install` command to install `avrdude`, this will allow you to upload firmata to the arduino:

    $ gort firmata install

Once the avrdude uploader is installed we upload the firmata protocol to the arduino, use the arduino serial port address found when you ran `gort scan serial`:

    $ gort firmata upload /dev/tty.usbmodem1421

Now you are ready to connect and communicate with the Arduino using serial port connection

### Ubuntu

First plug the Arduino into your computer via the USB/serial port.

Install the cylon-firmata module:

    $ npm install cylon-firmata

Once plugged in, use [Gort](http://gort.io)'s `gort scan serial` command to find out your connection info and serial port address:

    $ gort scan serial

Use the `gort firmata install` command to install `avrdude`, this will allow you to upload firmata to the arduino:

    $ gort firmata install

Once the avrdude uploader is installed we upload the firmata protocol to the arduino, use the arduino serial port address found when you ran `gort scan serial`, or leave it blank to use the default address `ttyACM0`:

    $ gort firmata upload ttyACM0

Now you are ready to connect and communicate with the Arduino using serial port connection

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”
  * For git help see [progit](http://git-scm.com/book) which is an awesome (and free) book on git

## Release History

Version 0.19.0 - Compatibility with Cylon 0.22.0

Version 0.18.0 - Compatibility with Cylon 0.21.0

Version 0.17.2 - Validate if cmd is an array in I2C requests.

Version 0.17.1 - Fixes issue with I2C read not passimg the command as an array

Version 0.17.0 - Compatibility with Cylon 0.20.0

Version 0.16.0 - Compatibility with Cylon 0.19.0

Version 0.15.0 - Compatibility with Cylon 0.18.0

Version 0.14.0 - Compatibility with Cylon 0.16.0

Version 0.13.1 - Add peerDependencies to package.json

Version 0.13.0 - Compatibility with Cylon 0.15.0

Version 0.12.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.11.1 - Added examples and updated adaptor

Version 0.11.0 - Update to cylon 0.12.0

Version 0.10.2 - Correct version numbers

Version 0.10.1 - CLI bugfixes

Version 0.10.0 - Updates to Cylon 0.11.0, migrated to pure JS

Version 0.9.0 - Updates to Cylon 0.10.0, CLI commands to install Firmata

Version 0.8.0 - Updates to Cylon 0.9.0, correct use of peerDependencies

Version 0.7.0 - Updates to Cylon 0.8.0

Version 0.6.0 - Updates to Cylon 0.7.0

Version 0.5.0 - Updates to Cylon 0.6.0

Version 0.4.0 - Updates to latest cylon core

Version 0.3.0 - Add support for i2c, load cylon-i2c driver set

Version 0.2.0 - Add support for PWM and servo commands, and refactor to use Basestar

Version 0.1.0 - Initial release with support for digital read/write and analog read/write

## License

Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
