import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Terminal} from '@xterm/xterm';
import {TerminalService} from '../../services/terminal.service';
import {Subscription} from 'rxjs';
import {FitAddon} from '@xterm/addon-fit';
import {defaultOptions} from '../../shared/TerminalOptions';
import {defTheme} from '../../shared/Themes';
import {SpecialKey} from '../../enums/SpecialKey.enum';
import {CaretService} from '../../services/caret.service';
import {MultiCommandService} from '../../services/signals/multi-command.service';
import { getTerminals } from 'src/app/helpers/getTerminals';
import {isWindows, newLine} from '../../helpers/os-detector';
import { AnsiDecoderService } from 'src/app/services/ansi-decoder.service';

@Component({
  selector: 'ui-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit, OnDestroy, AfterViewInit {
  id = input.required<string>({
    alias: 'terminalId'
  });

  name = input.required<string>({
    alias: 'terminalName'
  });

  initCwd = input.required<string>({
    alias: 'cwd'
  });

  initCommands = input.required<string[]>();

  usedCommands: string[] = [];

  usedCommandsId: number = 0;

  terminal: Terminal;
  terminalElement: HTMLElement;
  command = '';
  autocompletion = '';
  autocomplete = false;
  isLoading = true;

  //services
  terminalService = inject(TerminalService);
  caretService = inject(CaretService);
  multiCommandService = inject(MultiCommandService);
  ansiDecoderService = inject(AnsiDecoderService);

  private subs: Subscription = new Subscription();

  clearMultiCommand = computed(() => {
    if (this.multiCommandService.command().count === getTerminals().length) {
      this.multiCommandService.clearCommand();
    }
  });

  runMultiCommand = effect(() => {
    if (this.multiCommandService.isCommandEmpty()) {
      return;
    }

    this.command = this.multiCommandService.command().text;
    this.write(this.command);
    this.executeCommand();
  });

  ngAfterViewInit(): void {
    this.initTerminal();

    //maybe better chat
//     let outputBuffer = '';
// const startMarker = `__CMD_START__${this.id()}__`;
// const endMarker = `__CMD_END__${this.id()}__`;
// let isCapturing = false;

// this.subs.add(
//   this.terminalService.$getResponse.subscribe(response => {
//     if (response.id === this.id()) {
//       let resp = this.ansiDecoderService.decodeAnsi(response.termData);
//       outputBuffer += resp;

//       if (outputBuffer.includes(startMarker)) {
//         isCapturing = true;
//         outputBuffer = outputBuffer.substring(outputBuffer.indexOf(startMarker) + startMarker.length);
//       }

//       if (isCapturing && outputBuffer.includes(endMarker)) {
//         const commandOutput = outputBuffer.substring(0, outputBuffer.indexOf(endMarker));

//         // Write the output to the terminal
//         this.write(commandOutput);

//         // Reset the buffer for the next command
//         outputBuffer = outputBuffer.substring(outputBuffer.indexOf(endMarker) + endMarker.length);
//         isCapturing = false;
//       }
//     }
//   })
// );

    this.subs.add(
      this.terminalService.$getResponse.subscribe(response => {
        if (response.id === this.id()) {
          const resp = this.ansiDecoderService.decodeAnsi(response.termData);
          console.log(`RESP: ${resp}`);
          console.log('-------------------------------------------------');
          this.isLoading = false;
          this.write(resp);

          if (this.autocomplete) {
            this.autocompletion += resp;
          }
        }
      })
    );
  }

  ngOnInit(): void {
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ngOnDestroy(): void {
    this.deleteTerminal();
    this.subs.unsubscribe();
  }

  deleteTerminal(): void {
    this.terminalService.deleteTerminal();
  }

  initTerminal() {
    this.terminal = new Terminal(defaultOptions);
    this.terminal.options.theme = defTheme;
    const fitAddon = new FitAddon();
    this.terminal.loadAddon(fitAddon);
    this.terminalElement = document.getElementById(this.id());
    this.terminal.open(this.terminalElement);
    fitAddon.fit();

    this.IOTerminal();

    this.terminalService.addTerminal({
      id: this.id(),
      cwd: this.initCwd(),
      cols: this.terminal.cols,
      rows: this.terminal.rows
    });


    // its working :)
    // this.initCommands.forEach(command => {
    //   this.terminalService.sendCommand({
    //     id: this.id,
    //     command: command,
    //     cols: this.terminal.cols,
    //     rows: this.terminal.rows
    //   });
    // });
  }

  IOTerminal() {
    this.terminal.onKey(input => {
      let tmpCommand = '';
      if (this.usedCommands.length > 0) {
        tmpCommand = this.usedCommands[this.usedCommandsId];
      }

      const key = input.domEvent.key;
      const ctrlKey = input.domEvent.ctrlKey;
      const altKey = input.domEvent.altKey;
      const caretX = this.getCaretX();
      switch (true) {
        case ctrlKey:
          switch (key) {
            case 'c':
              this.command = String.fromCharCode(3);
              this.executeCommand();
              break;
            case 'v':
              navigator.clipboard.readText().then(data => {
                const trimData = data.trim();
                this.modifyCommand(
                  caretX - 2,
                  caretX - 2,
                  caretX + trimData.length + 1,
                  trimData
                );
              });
              break;
            case 'a':
              this.write(this.caretService.moveToColumn(3));
              break;
            case 'e':
              this.write(
                this.caretService.moveToColumn(
                  this.command.length + this.autocompletion.length + 3
                )
              );
              break;
            case 'b':
              this.write(this.caretService.moveLeft());
              break;
            case 'f':
              this.write(this.caretService.moveRight());
              break;
            case 'u':
              console.log('Delete to to left end');
              break;
            case 'k':
              console.log('Delete to on to the right');
              break;
          }
          break;
        case altKey:
          switch (key) {
            case 'b':
              console.log('Move to the start of the word');
              break;
            case 'f':
              console.log('Move to the end of the word');
              break;
            case 'a':
              console.log('delete to the start of the word');
              break;
            case 'd':
              console.log('delete to the end of the word');
              break;
          }
          break;

        case key === SpecialKey.BACKSPACE:
          if (caretX > 2) {
            this.modifyCommand(caretX - 3, caretX - 2, caretX);
          }
          break;
        case key === SpecialKey.DELETE:
          if (caretX > 2) {
            this.modifyCommand(caretX - 2, caretX - 1, caretX + 1);
          }
          break;
        case key === SpecialKey.ENTER:
          console.log(`cmd: ${this.command}`);
          this.executeCommand();
          break;
        case key === SpecialKey.TAB:
          this.autoComplete();
          break;
        case key === SpecialKey.ARROW_UP:
          this.clearLine();
          this.write(tmpCommand);
          this.command = tmpCommand;

          if (this.usedCommandsId > 0) {
            this.usedCommandsId--;
          }
          break;
        case key === SpecialKey.ARROW_DOWN:
          this.clearLine();
          this.write(tmpCommand);
          this.command = tmpCommand;

          if (this.usedCommandsId < this.usedCommands.length - 1) {
            this.usedCommandsId++;
          }
          break;
        case key === SpecialKey.ARROW_LEFT:
          if (caretX > 2) {
            this.write(this.caretService.moveLeft());
          }
          break;
        case key === SpecialKey.ARROW_RIGHT:
          if (caretX < this.command.length + this.autocompletion.length + 2) {
            this.write(this.caretService.moveRight());
          }
          break;
        case key === SpecialKey.PAGE_UP:
          this.clearLine();
          this.write(this.usedCommands[0]);
          this.usedCommandsId = 0;
          break;
        case key === SpecialKey.PAGE_DOWN:
          this.clearLine();
          this.usedCommandsId = this.usedCommands.length - 1;
          break;
        case key === SpecialKey.F1 ||
          key === SpecialKey.F2 ||
          key === SpecialKey.F3 ||
          key === SpecialKey.F4 ||
          key === SpecialKey.F5 ||
          key === SpecialKey.F6 ||
          key === SpecialKey.F7 ||
          key === SpecialKey.F8 ||
          key === SpecialKey.F9 ||
          key === SpecialKey.F10 ||
          key === SpecialKey.F11 ||
          key === SpecialKey.F12:
          console.log('F1-F12');
          break;
        default:
          this.modifyCommand(caretX - 2, caretX - 2, caretX + 2, key);
      }
    });
  }

  executeCommand(): void {
    this.terminalService.sendCommand({
      id: this.id(),
      command: this.command,
      cols: this.terminal.cols,
      rows: this.terminal.rows
    });
    this.addToArray(this.autocomplete ? this.autocompletion : this.command);
    this.autocomplete = false;
    this.autocompletion = '';
    this.specialCommands();
    this.command = '';
  }

  autoComplete(): void {
    this.autocomplete = true;
    this.terminalService.autoComplete({
      id: this.id(),
      command: this.command,
      cols: this.terminal.cols,
      rows: this.terminal.cols
    });
    this.clearLine();
    this.write(this.autocompletion);
    this.command = '';
  }
  clearLine(): void {
    this.write(this.caretService.eraseAll());
    this.write(isWindows() ? '\r$ ' : '\r $ ');
  }

  modifyCommand(start: number, end: number, moveTo: number, input = ''): void {
    //common
    this.clearLine();
    this.command = `${this.command.slice(0, start)}${input}${this.command.slice(end)}`;
    this.write(this.autocompletion);
    this.write(this.command);
    this.write(this.caretService.moveToColumn(moveTo));
  }

  write(input: string): void {
    this.terminal.write(input);
  }

  getCaretX(): number {
    return this.terminal.buffer.normal.cursorX;
  }
  addToArray(command: string): void {
    if (!command) return;

    if (command === String.fromCharCode(3)) return;

    if (command === '\t') return;

    this.usedCommands.push(command);

    this.usedCommands.reverse();
    this.usedCommands = [...new Set(this.usedCommands)];
    this.usedCommands.reverse();

    this.usedCommandsId = this.usedCommands.indexOf(command);
  }

  specialCommands(): void {
    switch(this.command.toLowerCase()) {
      case 'clear':
        console.log('terminalCLear')
        this.terminal.write('\x1B[2J\x1B[H');
        break;
      default:
        break;
    }
  }
}
