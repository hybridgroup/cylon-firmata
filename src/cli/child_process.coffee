sys = require('sys')
spawn = require('child_process').spawn
exec = require('child_process').exec

childProcess =
  exec: (command) ->
    exec(command, (err, stdout, stderr) ->
      sys.print(stdout)
      sys.print(stderr)
      sys.print(err)
    )
  spawn: (command, args) ->

    cmd = spawn(command, args, { stdio: 'inherit' })

    cmd.on('close', (code) ->
      if (code != 0)
        console.log('ps process exited with code ' + code)
    )

    cmd.on('exit', (code) ->
      if (code != 0)
        console.log('ps process exited with code ' + code)
    )

module.exports = childProcess
