import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzTabsModule, NzIconModule, NzDropDownModule } from 'ng-zorro-antd'
import { CloseOutline } from '@ant-design/icons-angular/icons'
import { TabComponent } from './tab.component'

const icons = [CloseOutline]

@NgModule({
  declarations: [TabComponent],
  imports: [
    CommonModule,
    NzDropDownModule,
    NzTabsModule,
    NzIconModule.forRoot(icons),
  ],
  exports: [NzTabsModule, NzIconModule, NzDropDownModule, TabComponent],
})
export class TabModule { }
