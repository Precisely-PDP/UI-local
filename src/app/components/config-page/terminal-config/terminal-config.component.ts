import {Component, inject, OnInit} from '@angular/core';
import {UiConfigService} from '../../../signals/uiConfig.service';

@Component({
  selector: 'ui-terminal-config',
  templateUrl: './terminal-config.component.html',
  styleUrl: './terminal-config.component.scss'
})
export class TerminalConfigComponent implements OnInit {
  stages = [
    'dev',
    'dev2',
    'dev3',
    'qa',
    'staging'
  ];

  uiConfigService = inject(UiConfigService);

  test: string;

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.uiConfigService.setStageRegion(selectElement.value);
    localStorage.setItem('stage', selectElement.value);
    this.test = selectElement.value;
  }

  ngOnInit() {
    const storedStage = localStorage.getItem('stage');
    if (storedStage) {
      this.uiConfigService.setStageRegion(storedStage);
    } else {
      this.uiConfigService.setStageRegion(this.stages[0]);
    }
  }
}
