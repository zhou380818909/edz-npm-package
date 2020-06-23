import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { FormsModule } from '@angular/forms';


import { SearchListComponent } from './search-list/search-list.component'
import { BoolTextComponent } from './bool-text/bool-text.component'
import { SecretTextComponent } from './secret-text/secret-text.component';
import { LayerComponent } from './layer/layer.component';
import { GroupDatepickerComponent } from './group-datepicker/group-datepicker.component';
import { HttpClientModule } from '@angular/common/http';

const components = [
    SearchListComponent,
    BoolTextComponent,
    SecretTextComponent,
    LayerComponent,
    GroupDatepickerComponent
]

@NgModule({ 
  declarations: components,
  exports: components,
  imports: [
    FormsModule, 
    CommonModule,
    NgZorroAntdModule,
    HttpClientModule,
  ],
  providers: [
    
  ]
})
export class EdzNg2LibraryModule { }
