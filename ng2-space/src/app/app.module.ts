import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent } from './app.component';

import { EdzNg2LibraryModule } from '../../projects/edz-ng2-library/src/lib/edz-ng2-library.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        EdzNg2LibraryModule,
        NgZorroAntdModule,
        BrowserAnimationsModule
    ],
    providers: [
        { provide: NZ_I18N, useValue: zh_CN },
        { provide: LOCALE_ID, useValue: 'zh-CN' },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
