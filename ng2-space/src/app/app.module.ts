import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import zh from '@angular/common/locales/zh'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouteReuseStrategy } from '@angular/router'
import { RouteReuseServiceFactory } from 'edz-ng2-library'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n'
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
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, { provide: RouteReuseStrategy, useClass: RouteReuseServiceFactory(50) }],
  bootstrap: [AppComponent],
})
export class AppModule {}
