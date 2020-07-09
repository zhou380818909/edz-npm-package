import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzMenuModule, NzIconModule } from 'ng-zorro-antd'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { MenuComponent } from './menu.component'

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    RouterModule,
    NzIconModule,
    HttpClientModule,
  ],
  exports: [RouterModule, NzMenuModule, MenuComponent, NzIconModule, HttpClientModule],
})
export class MenuModule {}
