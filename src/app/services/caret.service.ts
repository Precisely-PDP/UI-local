import {CaretSequences} from '../enums/CaretSequences';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaretService {
  moveLeft(col = 1): string {
    return `${CaretSequences.ESC}[${col}D`;
  }

  moveRight(col = 1): string {
    return `${CaretSequences.ESC}[${col}C`;
  }

  eraseE(): string {
    return `${CaretSequences.ESC}[0K`;
  }

  eraseS(): string {
    return `${CaretSequences.ESC}[1K`;
  }

  eraseAll(): string {
    return `${CaretSequences.ESC}[2K`;
  }

  moveToStart(): string {
    return `${CaretSequences.ESC}[H`;
  }

  moveToBeginning(): string {
    return `${CaretSequences.ESC}[0F`;
  }
  moveCaretTo(row: number, col: number) {
    return `${CaretSequences.ESC}[${row};${col}f`;
  }

  moveToEnd(): string {
    return `${CaretSequences.ESC}[0E`;
  }

  moveToColumn(col: number): string {
    return `${CaretSequences.ESC}[${col}G`;
  }
}
