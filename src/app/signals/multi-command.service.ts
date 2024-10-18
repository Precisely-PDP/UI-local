import {Injectable, signal} from '@angular/core';
import {ISignalCommand} from '../Interfaces/ISignalCommand';

@Injectable({
  providedIn: 'root'
})
export class MultiCommandService {
  command = signal<ISignalCommand>({
    text: '',
    count: 0
  });

  setCommand(command: string) {
    this.command.set({
      text: command,
      count: this.command().count++
    });
  }

  clearCommand() {
    this.command.set({
      text: '',
      count: 0
    });
  }

  isCommandEmpty(): boolean {
    return this.command().text === '';
  }
}
