import {Injectable, signal} from '@angular/core';
import {getTerminals} from '../helpers/getTerminals';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly terminalCount = getTerminals().length;
  terminalNumber = signal<number>(0);

  increaseLoadedTerminals() {
    this.terminalNumber.update(value => value + 1);
  }

  isLoaded(): boolean {
    return this.terminalCount === this.terminalNumber();
  }
}
