import {ITerminalBase} from './ITerminalBase';

export interface ITerminalCommand extends ITerminalBase {
  command: string;
  cols: number;
  rows: number;
}
