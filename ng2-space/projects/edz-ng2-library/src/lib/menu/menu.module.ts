import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NzIconModule, NzMenuModule, NzToolTipModule } from 'ng-zorro-antd'
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
