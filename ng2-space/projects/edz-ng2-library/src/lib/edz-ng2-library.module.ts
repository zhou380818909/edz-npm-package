import { NgModule } from '@angular/core'
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n'
import { BoolTextModule } from './components/bool-text'
import { FormModule } from './components/form/form.module'
import { GroupDatepickerModule } from './components/group-datepicker/group-datepicker.module'
import { InfoModule } from './components/info/info.module'
import { LayoutsModule } from './components/layouts/layouts.module'
import { MenuModule } from './components/menu/menu.module'
import { SearchBarModule } from './components/search-bar/search-bar.module'
import { SecretTextModule } from './components/secret-text/secret-text.module'
import { TabSetModule } from './components/tab-set/tab-set.module'
import { TabModule } from './components/tab/tab.module'
import { TableModule } from './components/table/table.module'
import { UploadModule } from './components/upload/upload.module'
import { DirectivesModule } from './directives/directives.module'
import { PipesModule } from './pipes/pipes.module'

const modules = [
  SecretTextModule,
  BoolTextModule,
  FormModule,
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
