import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';


import { SearchListComponent } from './search-list/search-list.component'
import { BoolTextComponent } from './bool-text/bool-text.component'
import { SecretTextComponent } from './secret-text/secret-text.component';
import { LayerComponent } from './layer/layer.component';

const components = [
    SearchListComponent,
    BoolTextComponent,
    SecretTextComponent,
    LayerComponent
]

@NgModule({ 
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  providers: [
    // { provide: NZ_I18N, useValue: zh_CN },
  ]
})
export class EdzNg2LibraryModule { }
