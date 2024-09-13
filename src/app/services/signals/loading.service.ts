import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly terminalCount = 6;
  terminalNumber = signal<number>(0);

  increaseLoadedTerminals() {
    this.terminalNumber.update(value => value + 1);
  }
  
  isLoaded(): boolean {
    return this.terminalCount === this.terminalNumber();
  }
}
