import {Component, OnInit} from '@angular/core';
import {ITerminalInit} from '../../Interfaces/ITerminalInit';
import { NpmCommands } from 'src/app/enums/NpmCommands.enum';
import { getRepoPath } from 'src/app/helpers/getRepoPath';

@Component({
  selector: 'ui-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrl: './terminal-list.component.scss'
})
export class TerminalListComponent implements OnInit {

  terminals: ITerminalInit[] = [
    {
      id: '0',
      cwd: getRepoPath('core', 'communicate-ui-orchestrator'),
      name: 'Orchestrator',
      commands: [NpmCommands.START]
    },
    {
      id: '1',
      cwd: getRepoPath('core', 'communicate-ui-header'),
      name: 'Header',
      commands: [NpmCommands.SERVE]
    },
    {
      id: '2',
      cwd: getRepoPath('core', 'communicate-ui-core'),
      name: 'Core',
      commands: [NpmCommands.SERVE]
    },
    {
      id: '3',
      cwd: getRepoPath('video', 'video-channel-ui'),
      name: 'Video',
      commands: [NpmCommands.SERVE]
    },
    {
      id: '4',
      cwd: getRepoPath('chat', 'converse-ui'),
      name: 'Chat',
      commands: [NpmCommands.SERVE]
    },
    {
      id: '5',
      cwd: getRepoPath('block-designer', 'communicate-block-designer'),
      name: 'Block Designer',
      commands: [NpmCommands.SERVE]
    }
  ];

  ngOnInit(): void {
  }
}
