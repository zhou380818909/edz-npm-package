import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { BoolTextModule } from './bool-text/bool-text.module'
import { GroupDatepickerModule } from './group-datepicker/group-datepicker.module'
import { LayerModule } from './layer/layer.module'
import { SearchListModule } from './search-list/search-list.module'
import { SecretTextModule } from './secret-text/secret-text.module'
import { TableModule } from './table/table.module'

const modules = [
  CommonModule,
  SecretTextModule,
  SearchListModule,
  BoolTextModule,
  LayerModule,
  GroupDatepickerModule,
  TableModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
})
export class EdzNg2LibraryModule { }
