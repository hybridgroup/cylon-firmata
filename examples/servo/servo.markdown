# Servo

For this example, similar in structure to the led_brightness example, we're
going to take an Arduino, and modify the angle of an attached servo such that
it's continually turning back and forth.

Before we get started, make sure to have the `cylon-arduino` module installed.

First, let's require Cylon:

    var Cylon = require('cylon');

Now we can start defining our robot:

    Cylon.robot({

We'll be connecting to an Ardunio, using the Firmata protocol, and a servo
attached to the Arduino on pin 3. We have the option to pass an extra 'range'
param to the device, this param sets the min and max angle values. By default
this is set to min: 30, max: 150 to prevent damaging the servo when giving it
an angle outside the range it can cover.

      connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },
      device: {
        name: 'servo',
        driver: 'servo',
        pin: 3,
        limits: { bottom: 20, top: 160 }
      },


We'll start defining the work for our robot next:

      work: function(my) {

We'll define variables to hold our servo's angle, and the rate at which that
angle will change:

        var angle = 30,
            increment = 40;

Every second, we'll increment the `angle`, set the servo to run at that angle,
and log the angle we're running at to the console. We'll also make sure to
change the increment if the angle is at the upper/lower bounds of the values
supported:

        every((1).seconds(), function() {
          angle += increment;

          my.servo.angle(angle);

          console.log("Current Angle: " + (my.servo.currentAngle()));

          if ((angle === 30) || (angle === 150)) {
            increment = -increment;
          }
        });
      }

And with all that done, we can now start our robot:

    }).start();
