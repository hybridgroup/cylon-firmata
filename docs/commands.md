# Commands

## digitalRead(pin, callback)

Reads a value from a digital pin.
Triggers the provided callback with `(err, data)` when the pin's reading changes.

## digitalWrite(pin, value)

Writes a value to a digital pin.

## analogRead(pin, callback)

Reads a value from a analog pin.
Triggers the provided callback with `(err, data)` when the pin's reading changes.

## analogWrite(pin, value)

Writes a value to a analog pin.

## pwmWrite(pin, value)

Writes a value, scaled for PWM usage, to a analog pin.

## servoWrite(pin, value)

Writes a value, scaled for servo usage, to a analog pin.

## i2cWrite(address, cmd, buff, callback)

Sends an i2c write request with the specified commands/data to the board.
Triggers a provided callback when the write request is complete.

## i2cRead(address, cmd, length, callback)

Reads the specified length of data from the specified i2c address.
Triggers the callback with `(err, data)` when data is returned from the board.

## pinMode(pin, mode)

Sets the mode of a specific pin on the board.
`mode` is a string indicating which mode is wanted.
Currently supported: `input`, `output`, `analog`, `pwm`, `servo`.
Defaults to `input` if no mode specified.

## i2cConfig(delay)

Tells the board to configure i2c, with the specified delay.
