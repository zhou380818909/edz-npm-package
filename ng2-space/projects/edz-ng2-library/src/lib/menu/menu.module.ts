import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { MenuComponent } from './menu.component'

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    RouterModule,
    NzIconModule,
    HttpClientModule,
    NzToolTipModule,
  ],
  exports: [RouterModule, NzMenuModule, MenuComponent, NzIconModule, HttpClientModule, NzToolTipModule],
})
export class MenuModule {}
