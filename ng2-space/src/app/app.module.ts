import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { RouteReuseServiceFactory } from './services/route-reuse.service'
import { RouteReuseStrategy } from '@angular/router'
import { NzMessageModule } from 'ng-zorro-antd'
// import { SecretTextModule } from 'projects/edz-ng2-library/src/public-api';
import { EdzNg2LibraryModule } from '../../projects/edz-ng2-library/src/lib/edz-ng2-library.module'
import { RouteReuseServiceFactory } from '../../projects/edz-ng2-library/src/public-api'
import { AppComponent } from './app.component'
// import { MenuModule } from '../../projects/edz-ng2-library/src/lib/menu/menu.module'
import { AppRoutingModule } from './app.routing'
import { LayoutComponent } from './layout.component'

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // SecretTextModule
    EdzNg2LibraryModule,
    // MenuModule,
    AppRoutingModule,
    NzMessageModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: RouteReuseServiceFactory(10),
    },
  ],
  entryComponents: [LayoutComponent],
})
export class AppModule { }
