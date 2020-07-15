import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { SecretTextModule } from 'projects/edz-ng2-library/src/public-api';
import { EdzNg2LibraryModule, RouteReuseServiceFactory } from '../../projects/edz-ng2-library/src/lib/edz-ng2-library.module'
import { AppComponent } from './app.component'
// import { MenuModule } from '../../projects/edz-ng2-library/src/lib/menu/menu.module'
import { AppRoutingModule } from './app.routing'
// import { RouteReuseServiceFactory } from './services/route-reuse.service'
import { RouteReuseStrategy } from '@angular/router'


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // SecretTextModule
    EdzNg2LibraryModule,
    // MenuModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseServiceFactory(10),
    },
  ],
})
export class AppModule { }
