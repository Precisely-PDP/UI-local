import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

import {AppComponent} from './app.component';
import {TerminalComponent} from './components/terminal/terminal.component';
import {TerminalListComponent} from './components/terminal-list/terminal-list.component';
import {NgTerminalModule} from 'ng-terminal';
import {TerminalsManagerComponent} from './components/TerminalsManager/terminals-manager.component';

const config: SocketIoConfig = {url: 'http://localhost:4444', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    TerminalListComponent,
    TerminalsManagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    NgTerminalModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TerminalComponent]
})
export class AppModule {}
