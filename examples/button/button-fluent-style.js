var cylon = require('cylon');

cylon.robot({
  name: 'samantha',
  connection: { name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' },
  devices: {
    led: { driver: 'led', pin: 13 },
    button: { driver: 'button', pin: 2 }
  }
})

.on('ready', function(bot) {
  bot.button.on('push', function() {
    bot.led.toggle();
  });
})

.start();
