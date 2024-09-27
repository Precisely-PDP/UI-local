import { Injectable } from '@angular/core';
import stripAnsi from 'strip-ansi';

@Injectable({
  providedIn: 'root'
})
export class AnsiDecoderService {

  constructor() { }

  decodeAnsi(input: string): string {
    return stripAnsi(input);
  }
}
