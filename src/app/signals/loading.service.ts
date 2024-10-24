import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {getTerminals} from '../helpers/getTerminals';
import {ActiveTerminalsService} from './activeTerminals.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  //services
  activeTerminals = inject(ActiveTerminalsService);

  private readonly terminalCount = computed(
    () => this.activeTerminals.activeTerminals().length
  );
  terminalNumber = signal<number>(0);

  constructor() {
    effect(
      () => {
        const dummyValue = this.terminalCount();
        this.terminalNumber.set(0);
      },
      {
        allowSignalWrites: true
      }
    );
  }

  increaseLoadedTerminals() {
    this.terminalNumber.update(value => value + 1);
  }

  isLoaded(): boolean {
    return this.terminalCount() === this.terminalNumber();
  }
}
