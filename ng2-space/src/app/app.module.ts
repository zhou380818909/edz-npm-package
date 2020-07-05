import { NgModule, Injectable } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
// import { SecretTextModule } from 'projects/edz-ng2-library/src/public-api';
import { NgxsModule, State, Selector, Action, StateContext } from '@ngxs/store'
import { EdzNg2LibraryModule } from '../../projects/edz-ng2-library/src/lib/edz-ng2-library.module'
import { AppComponent } from './app.component'
import { MenuModule } from '../../projects/edz-ng2-library/src/lib/menu/menu.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // SecretTextModule
    EdzNg2LibraryModule,
    MenuModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
