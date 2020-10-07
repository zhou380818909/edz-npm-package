import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RoleRoutingModule } from './role-routing.module'
import { RoleListComponent } from './role-list/role-list.component'
import { RoleDetailComponent } from './role-detail/role-detail.component'

@NgModule({
  declarations: [RoleListComponent, RoleDetailComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
  ],
})
export class RoleModule { }
