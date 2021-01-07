import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { HeaderComponent } from './header/header.component'
import { LayoutComponent } from './layout/layout.component'

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    RouterModule,
    NzIconModule,
    NzSpinModule,
  ],
  exports: [LayoutComponent, HeaderComponent, NzLayoutModule, RouterModule, NzIconModule],
})
export class LayoutsModule { }
