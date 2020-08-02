import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CloseOutline } from '@ant-design/icons-angular/icons'
import { NzDropDownModule, NzIconModule, NzTabsModule } from 'ng-zorro-antd'
import { TabComponent } from './tab.component'

const icons = [CloseOutline]

@NgModule({
  declarations: [TabComponent],
  imports: [
    CommonModule,
    NzDropDownModule,
    NzTabsModule,
    NzIconModule.forRoot(icons),
    RouterModule,
  ],
  exports: [RouterModule, NzTabsModule, NzIconModule, NzDropDownModule, TabComponent],
})
export class TabModule { }
