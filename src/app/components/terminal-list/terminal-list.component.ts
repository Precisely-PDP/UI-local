import {Component, effect, inject, OnInit} from '@angular/core';
import {ITerminalInit} from '../../Interfaces/ITerminalInit';
import {NpmCommands} from 'src/app/enums/NpmCommands.enum';
import {getRepoPath} from 'src/app/helpers/getRepoPath';
import {getTerminals} from 'src/app/helpers/getTerminals';
import {environment} from '../../../environments/environment';
import {LoadingService} from '../../signals/loading.service';
import {ActiveTerminalsService} from '../../signals/activeTerminals.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ui-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrl: './terminal-list.component.scss'
})
export class TerminalListComponent implements OnInit {
  readonly colors = environment.loadingColors;

  terminals: ITerminalInit[] = [];
  colorIndex = 0;

  //services
  activeTerminals = inject(ActiveTerminalsService);
  loadingService = inject(LoadingService);
  router = inject(Router);

  constructor() {
    effect(() => {
      this.terminals = this.activeTerminals.activeTerminals();
    });

    effect(() => {
      this.colorIndex = Math.floor(
        (this.loadingService.terminalNumber() / this.terminals.length) *
          (this.colors.length - 1)
      );
    });
  }

  ngOnInit(): void {
    this.loadingService.terminalNumber.set(0);
  }

  goToConfig() {
    this.router.navigate(['/config']);
  }
}
