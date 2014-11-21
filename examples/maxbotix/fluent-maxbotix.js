var Cylon = require('cylon');

Cylon
  .robot()
  .connection({ name: 'arduino', adaptor: 'firmata', port: '/dev/ttyACM0' })
  .device({ name: 'maxbotix', driver: 'maxbotix' })
  .on('ready', function(bot) {
    setInterval(function() {
      bot.maxbotix.range(function(data) {
        console.log("range: " + data);
      });
    }, 1000);
  });

Cylon.start();
