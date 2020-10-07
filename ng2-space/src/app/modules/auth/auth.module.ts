import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { AuthListComponent } from './auth-list/auth-list.component'
import { AuthDetailComponent } from './auth-detail/auth-detail.component'

@NgModule({
  declarations: [AuthListComponent, AuthDetailComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
