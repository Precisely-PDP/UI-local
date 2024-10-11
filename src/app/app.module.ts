import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

import {AppComponent} from './app.component';
import {TerminalComponent} from './components/terminal/terminal.component';
import {TerminalListComponent} from './components/terminal-list/terminal-list.component';
import {NgTerminalModule} from 'ng-terminal';
import {TerminalsManagerComponent} from './components/TerminalsManager/terminals-manager.component';
import {ConfigPageComponent} from './components/config-page/config-page.component';
import {RouterLink, RouterOutlet} from '@angular/router';

const config: SocketIoConfig = {url: 'http://localhost:4444', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    TerminalListComponent,
    TerminalsManagerComponent,
    ConfigPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgTerminalModule,
    RouterOutlet,
    RouterLink
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TerminalComponent]
})
export class AppModule {}
