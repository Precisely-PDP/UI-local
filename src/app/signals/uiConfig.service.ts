import {Injectable, signal} from '@angular/core';
import {ITerminalInit} from '../Interfaces/ITerminalInit';
import {getTerminals} from '../helpers/getTerminals';

@Injectable({
  providedIn: 'root'
})
export class UiConfigService {
  public selectedStageRegion = signal<string>('');

  constructor() {}

  setStageRegion(stage: string) {
    this.selectedStageRegion.set(stage);
  }
}
