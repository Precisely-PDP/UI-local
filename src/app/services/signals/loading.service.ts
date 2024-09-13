import {computed, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadTime = 19;
  timePassed = signal<number>(0);
  terminalNumber = signal<number>(0);
  loading = computed(
    () => this.timePassed() === this.terminalNumber() * this.loadTime
  );

  loadingTime() {
    this.timePassed.update(val => val + 1);
  }

  setNumberOfTerminals(count: number) {
    this.terminalNumber.set(count);
  }
}
