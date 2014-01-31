(function() {
  var childProcess, exec, spawn, sys;

  sys = require('sys');

  spawn = require('child_process').spawn;

  exec = require('child_process').exec;

  childProcess = {
    exec: function(command) {
      return exec(command, function(err, stdout, stderr) {
        sys.print(stdout);
        sys.print(stderr);
        return sys.print(err);
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
