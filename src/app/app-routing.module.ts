import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigPageComponent} from './components/config-page/config-page.component';
import {TerminalListComponent} from './components/terminal-list/terminal-list.component';

const routes: Routes = [
  { path: 'config', component: ConfigPageComponent },
  { path: 'terminals', component: TerminalListComponent },
  { path: '', redirectTo: '/config', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
