const os = require('node:os');
const terminate = require('terminate/promise');
const pty = require('node-pty');
const shell =
  os.platform() === 'win32' ? 'C:\\Program Files\\Git\\bin\\bash.exe' : '/usr/bin/zsh';
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

const { v4: uuidv4 } = require('uuid');

const terminals = new Map();

const prohibitedCommands = [
  'clear'
];

const prefixes = Object.freeze({
  CONNECTION: 'CONNECTION',
  ON_DATA: 'ON_DATA',
  REMOVE_TERMINAL: 'REMOVE_TERMINAL',
  SEND_COMMAND: 'SEND_COMMAND',
  AUTO_COMPLETE: 'AUTO_COMPLETE',
  ON_EXIT: 'ON_EXIT',
  ERROR: 'ERROR',
});

const newLine = () => {
  return os.platform() === "win32" ? '\r\n' : '\n';
}

io.on('connection', socket => {
  socket.on('addTerminal', init => {
    console.log(`${prefixes.CONNECTION}: addingTerminal ${JSON.stringify(init)}`);
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
    terminals.get(init.id).onData(data => {
      console.log(`${prefixes.ON_DATA}: ${JSON.stringify(data, null, 2)}`)
      socket.emit('getServerRespond', {termData: data, id: init.id});
    });

    terminals.get(init.id).onExit(({ exitCode, signal }) => {
      console.log(`${prefixes.ON_EXIT}: Terminal ${init.id} exited with code ${exitCode} and signal ${signal}`);
      terminals.delete(init.id);
    });

    terminals.get(init.id).on('error', err => {
      console.error(`${prefixes.ERROR}: Terminal ${init.id} error:`, err);
    });
  });

  socket.on('removeTerminal', () => {
    terminals.forEach(terminal => {
      console.log(`${prefixes.REMOVE_TERMINAL}: killing terminal with pid: ${terminal.pid}`);
      (async () => {
        try {
          await terminate(terminal.pid);
          console.log(`${prefixes.REMOVE_TERMINAL}: killed terminal: ${terminal._pid}`);
        } catch (err) {
          console.log(`${prefixes.REMOVE_TERMINAL}: Oopsy:`, err);
        }
      })();
    });
    terminals.clear();
  });

  const executeCommand = (terminalId, command) => {
    // const uuid = uuidv4();
    // const startMarker = `__CMD_START__${uuid}__`;
    // const endMarker = `__CMD_END__${uuid}__`;
    
    const startMarker = `__CMD_START__${terminalId}__`;
    const endMarker = `__CMD_END__${terminalId}__`;
    
    const ptyProcess = terminals.get(terminalId);

    //ptyProcess.write(`${startMarker}`);
    ptyProcess.write(`${command}${newLine()}`);
    //ptyProcess.write(`${endMarker}`);
  }

  socket.on('sendCommand', command => {
    let cmd = command.command.toString();
    console.log(`${prefixes.SEND_COMMAND}: cmd: ${cmd}`);
    terminals
      .get(command.id)
      .resize(Math.max(command.cols - 5, 10), Math.max(command.rows, 10));

    if (prohibitedCommands.includes(cmd.toLowerCase())) {
      console.log(`${prefixes.SEND_COMMAND}: Prohibited commands returning`);
      return;
    }

    // terminals.get(command.id).write(`${cmd}${newLine()}`);

    executeCommand(command.id, cmd);
  });

  socket.on('autoComplete', command => {
    let cmd = command.command.toString();
    console.log(`${prefixes.AUTO_COMPLETE}: autoComplete: ${cmd}`);
    if (!cmd) {
      return;
    }

    terminals.get(command.id).write(cmd + '\t');
  });

  console.log(`${prefixes.CONNECTION}: Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
  console.log('Listening on port 4444');
});
