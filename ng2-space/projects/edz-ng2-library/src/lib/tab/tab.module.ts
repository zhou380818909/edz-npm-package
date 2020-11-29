import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { EmptyComponent, TabComponent } from './tab.component'

@NgModule({
  declarations: [TabComponent, EmptyComponent],
  imports: [
    CommonModule,
    NzDropDownModule,
    NzTabsModule,
    RouterModule,
  ],
  exports: [RouterModule, NzTabsModule, NzIconModule, NzDropDownModule, TabComponent],
})
export class TabModule { }
