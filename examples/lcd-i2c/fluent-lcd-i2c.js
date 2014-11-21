var Cylon = require('cylon');

Cylon
  .robot()
  .connection({ name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' })
  .device({ name: 'lcd', driver: 'lcd' })
  .on('ready', function(bot) {
    bot.lcd.print("Hello!");
  });

Cylon.start();
