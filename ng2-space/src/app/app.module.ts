import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import zh from '@angular/common/locales/zh'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouteReuseStrategy } from '@angular/router'
import { RouteReuseService, ROUTER_REUSE_CACHE_SIZE } from 'dev'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n'
import { NzMessageModule } from 'ng-zorro-antd/message'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutModule } from './layout/layout.module'

registerLocaleData(zh)

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    NzMessageModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: ROUTER_REUSE_CACHE_SIZE, useValue: 50 },
    { provide: RouteReuseStrategy, useClass: RouteReuseService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
