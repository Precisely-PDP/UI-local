const os = require('node:os');
const terminate = require('terminate/promise');
const pty = require('node-pty');
const shell =
  os.platform() === 'win32' ? 'C:\\Program Files\\Git\\bin\\bash.exe' : 'bash';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

const terminals = new Map();

io.on('connection', socket => {
  console.log(`shell:${shell}`);
  socket.on('addTerminal', init => {
    console.log(`addingTerminal ${init.id}`);
    terminals.set(
      init.id,
      pty.spawn(shell, [], {
        name: 'term' + init.id,
        cols: init.cols,
        rows: init.rows,
        cwd: init.cwd,
        env: process.env
      })
    );
    socket.emit('addedTerminal');
    terminals.get(init.id).onData(data => {
      socket.emit('getServerRespond', {termData: data, id: init.id});
    });
  });

  socket.on('removeTerminal', () => {
    terminals.forEach(terminal => {
      console.log(`killing terminal with pid: ${terminal._pid}`);
      (async () => {
        try {
          await terminate(terminal._pid);
          console.log(`killed terminal: ${terminal._pid}`);
        } catch (err) {
          console.log('Oopsy:', err);
        }
      })();
    });
    terminals.clear();
  });

  socket.on('sendCommand', command => {
    let cmd = command.command.toString();
    terminals
      .get(command.id)
      .resize(Math.max(command.cols - 5, 10), Math.max(command.rows, 10));
    terminals.get(command.id).write(cmd + '\r');
  });

  socket.on('autoComplete', command => {
    let cmd = command.command.toString();

    if (!cmd) {
      return;
    }

    terminals.get(command.id).write(cmd + '\t');
  });

  console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
  console.log('Listening on port 4444');
});
