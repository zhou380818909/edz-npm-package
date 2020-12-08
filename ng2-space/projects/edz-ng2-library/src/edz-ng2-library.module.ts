import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n'
import { DirectivesModule } from './directives/directives.module'
import { BoolTextModule } from './lib/bool-text/bool-text.module'
import { GroupDatepickerModule } from './lib/group-datepicker/group-datepicker.module'
import { InfoModule } from './lib/info/info.module'
import { LayoutsModule } from './lib/layouts/layouts.module'
import { MenuModule } from './lib/menu/menu.module'
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
  GroupDatepickerModule,
  TableModule,
  MenuModule,
  TabModule,
  SearchBarModule,
  TabSetModule,
  PipesModule,
  InfoModule,
  UploadModule,
  DirectivesModule,
  LayoutsModule,
]

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
  ],
  declarations: [],
})
export class EdzNg2LibraryModule { }
