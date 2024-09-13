import {ITerminalBase} from './ITerminalBase';

export interface ITerminalInit extends ITerminalBase {
  cwd: string;
  cols?: number;
  rows?: number;
  commands?: string[];
}
