import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ITerminalResponse} from '../Interfaces/ITerminalResponse';
import {ITerminalCommand} from '../Interfaces/ITerminalCommand';
import {ITerminalInit} from '../Interfaces/ITerminalInit';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  $getResponse = this.socket.fromEvent<ITerminalResponse>('getServerRespond');

  $addedTerminal = this.socket.fromEvent('addedTerminal');

  constructor(private socket: Socket) {}

  addTerminal(init: ITerminalInit) {
    this.socket.emit('addTerminal', init);
  }

  deleteTerminal(): void {
    this.socket.emit('removeTerminal');
  }

  sendCommand(terminalCommand: ITerminalCommand) {
    this.socket.emit('sendCommand', terminalCommand);
  }

  autoComplete(terminalCommand: ITerminalCommand) {
    this.socket.emit('autoComplete', terminalCommand);
  }
}
