import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzMenuModule, NzIconModule } from 'ng-zorro-antd'
import { AppleOutline } from '@ant-design/icons-angular/icons'
import { HttpClientModule } from '@angular/common/http'
import { MenuComponent } from './menu.component'

const icons = [AppleOutline]

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule.forChild(icons),
    HttpClientModule,
  ],
  exports: [NzMenuModule, NzIconModule, MenuComponent, HttpClientModule],
})
export class MenuModule {}
