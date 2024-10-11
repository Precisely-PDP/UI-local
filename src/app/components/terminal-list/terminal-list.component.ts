import {Component, effect, inject, OnInit} from '@angular/core';
import {ITerminalInit} from '../../Interfaces/ITerminalInit';
import { NpmCommands } from 'src/app/enums/NpmCommands.enum';
import { getRepoPath } from 'src/app/helpers/getRepoPath';
import { getTerminals } from 'src/app/helpers/getTerminals';
import {environment} from '../../../environments/environment';
import {LoadingService} from '../../services/signals/loading.service';

@Component({
  selector: 'ui-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrl: './terminal-list.component.scss'
})
export class TerminalListComponent implements OnInit {
  readonly colors = environment.loadingColors;

  terminals: ITerminalInit[] = getTerminals();
  colorIndex = 0;
  loadingService = inject(LoadingService);

  loadingEffect = effect(() => {
    this.colorIndex = this.loadingService.terminalNumber();
  });

  ngOnInit(): void {
  }
}
