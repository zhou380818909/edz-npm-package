import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n'
import { BoolTextModule } from './lib/bool-text/bool-text.module'
import { GroupDatepickerModule } from './lib/group-datepicker/group-datepicker.module'
import { InfoModule } from './lib/info/info.module'
import { LayerModule } from './lib/layer/layer.module'
import { MenuModule } from './lib/menu/menu.module'
import { ScrollModule } from './lib/scroll/scroll.module'
import { SearchBarModule } from './lib/search-bar/search-bar.module'
import { SecretTextModule } from './lib/secret-text/secret-text.module'
import { TabSetModule } from './lib/tab-set/tab-set.module'
import { TabModule } from './lib/tab/tab.module'
import { TableModule } from './lib/table/table.module'
import { UploadModule } from './lib/upload/upload.module'
import { PipesModule } from './pipes/pipes.module'

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
  PipesModule,
  InfoModule,
  UploadModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
})
export class EdzNg2LibraryModule { }
