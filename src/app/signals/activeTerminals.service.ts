import {Injectable, signal} from '@angular/core';
import {ITerminalInit} from '../Interfaces/ITerminalInit';
import {getTerminals} from '../helpers/getTerminals';

@Injectable({
  providedIn: 'root'
})
export class ActiveTerminalsService {
  public activeTerminals = signal<ITerminalInit[]>([]);

  constructor() {}

  setTerminals(terminals: string[]) {
    const initTerminals = getTerminals().filter(terminal =>
      terminals.includes(terminal.name)
    );
    this.activeTerminals.set(initTerminals);
  }
}
