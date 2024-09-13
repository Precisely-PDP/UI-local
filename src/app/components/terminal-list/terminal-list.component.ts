import {Component, effect, inject, OnInit} from '@angular/core';
import {ITerminalInit} from '../../Interfaces/ITerminalInit';
import {LoadingService} from '../../services/signals/loading.service';

@Component({
  selector: 'ui-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrl: './terminal-list.component.scss'
})
export class TerminalListComponent implements OnInit {
  private readonly npmStart = 'npm run start';
  private readonly npmServe = 'npm run serve';
  readonly colors = [
    '#eee9f6',
    '#e3dbf0',
    '#d8ccea',
    '#cdbee5',
    '#c2afdf',
    '#b6a1d9',
    '#ab92d3',
    '#ab92d3',
    '#a084cd',
    '#9575c7',
    '#8a67c1',
    '#7f58bb',
    '#734ab5',
    '#6a44a7',
    '#613e98',
    '#58388a',
    '#4f327b',
    '#452c6d',
    '#3c265e'
  ];
  colorIndex = 0;
  loadingService = inject(LoadingService);

  loadingEffect = effect(() => {
    this.colorIndex = (this.loadingService.timePassed() / 6) % 19;
  });

  terminals: ITerminalInit[] = [
    {
      id: '0',
      cwd: 'C:\\ReposGitlab\\core\\communicate-ui-orchestrator',
      name: 'Orchestrator',
      commands: [this.npmStart]
    },
    {
      id: '1',
      cwd: 'C:\\ReposGitlab\\core\\communicate-ui-header',
      name: 'Header',
      commands: [this.npmServe]
    },
    {
      id: '2',
      cwd: 'C:\\ReposGitlab\\core\\communicate-ui-core',
      name: 'Core',
      commands: [this.npmServe]
    },
    {
      id: '3',
      cwd: 'C:\\ReposGitlab\\video\\video-channel-ui',
      name: 'Video',
      commands: [this.npmServe]
    },
    {
      id: '4',
      cwd: 'C:\\ReposGitlab\\chat\\converse-ui',
      name: 'Chat',
      commands: [this.npmServe]
    },
    {
      id: '5',
      cwd: 'C:\\ReposGitlab\\block-designer\\communicate-block-designer',
      name: 'Block Designer',
      commands: [this.npmServe]
    }
  ];

  ngOnInit(): void {
    this.loadingService.setNumberOfTerminals(this.terminals.length);
  }
}
