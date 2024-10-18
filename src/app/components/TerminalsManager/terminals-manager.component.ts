import {Component, inject} from '@angular/core';
import {MultiCommandService} from '../../signals/multi-command.service';

@Component({
  selector: 'ui-terminals-manager',
  templateUrl: './terminals-manager.component.html',
  styleUrl: './terminals-manager.component.scss'
})
export class TerminalsManagerComponent {
  commandText: string;

  //services
  multiCommandService = inject(MultiCommandService);

  send() {
    this.multiCommandService.setCommand(this.commandText);
  }
  clearTerminals() {
    this.multiCommandService.setCommand('clear');
  }
  stopTerminals() {
    this.multiCommandService.setCommand(String.fromCharCode(3));
  }
}
