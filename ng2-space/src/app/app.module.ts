import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
// import { SecretTextModule } from 'projects/edz-ng2-library/src/public-api';
import { EdzNg2LibraryModule } from '../../projects/edz-ng2-library/src/lib/edz-ng2-library.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    // SecretTextModule
    EdzNg2LibraryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
