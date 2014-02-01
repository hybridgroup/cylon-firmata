(function() {
  var childProcess, exec, spawn;

  spawn = require('child_process').spawn;

  exec = require('child_process').exec;

  childProcess = {
    exec: function(command) {
      return exec(command, function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        return console.log(err);
      });
    },
    spawn: function(command, args) {
      var cmd;
      cmd = spawn(command, args, {
        stdio: 'inherit'
      });
      cmd.on('close', function(code) {
        if (code !== 0) {
          return console.log('ps process exited with code ' + code);
        }
      });
      return cmd.on('exit', function(code) {
        if (code !== 0) {
          return console.log('ps process exited with code ' + code);
        }
      });
    }
  };

  module.exports = childProcess;

}).call(this);
