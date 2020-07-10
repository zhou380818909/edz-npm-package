import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd'
import { BoolTextModule } from './bool-text/bool-text.module'
import { GroupDatepickerModule } from './group-datepicker/group-datepicker.module'
import { LayerModule } from './layer/layer.module'
import { MenuModule } from './menu/menu.module'
import { SecretTextModule } from './secret-text/secret-text.module'
import { TableModule } from './table/table.module'
import { TabModule } from './tab/tab.module'
import { SearchBarModule } from './search-bar/search-bar.module'
import { TabSetModule } from './tab-set/tab-set.module'
import { ScrollModule } from './scroll/scroll.module'

const modules = [
  CommonModule,
  SecretTextModule,
  BoolTextModule,
  LayerModule,
  GroupDatepickerModule,
  TableModule,
  MenuModule,
  TabModule,
  SearchBarModule,
  TabSetModule,
  ScrollModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
})
export class EdzNg2LibraryModule { }
