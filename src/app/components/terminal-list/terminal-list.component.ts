import {Component, OnInit} from '@angular/core';
import {ITerminalInit} from '../../Interfaces/ITerminalInit';
import { NpmCommands } from 'src/app/enums/NpmCommands.enum';
import { getRepoPath } from 'src/app/helpers/getRepoPath';
import { getTerminals } from 'src/app/helpers/getTerminals';

@Component({
  selector: 'ui-terminal-list',
  templateUrl: './terminal-list.component.html',
  styleUrl: './terminal-list.component.scss'
})
export class TerminalListComponent implements OnInit {

  terminals: ITerminalInit[] = getTerminals();

  ngOnInit(): void {
  }
}
