import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';

import {AppComponent} from './app.component';
import {TerminalComponent} from './components/terminal/terminal.component';
import {TerminalListComponent} from './components/terminal-list/terminal-list.component';
import {NgTerminalModule} from 'ng-terminal';
import {TerminalsManagerComponent} from './components/TerminalsManager/terminals-manager.component';
import {ConfigPageComponent} from './components/config-page/config-page.component';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ProjectSelectionComponent} from './components/config-page/project-selection/project-selection.component';
import {TerminalConfigComponent} from './components/config-page/terminal-config/terminal-config.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

const config: SocketIoConfig = {url: 'http://localhost:4444', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    TerminalListComponent,
    TerminalsManagerComponent,
    ConfigPageComponent,
    ProjectSelectionComponent,
    TerminalConfigComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    NgTerminalModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [TerminalComponent]
})
export class AppModule {}
