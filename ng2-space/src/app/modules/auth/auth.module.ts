import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ViewModule } from 'dev'
import { AuthDetailComponent } from './auth-detail/auth-detail.component'
import { AuthListComponent } from './auth-list/auth-list.component'
import { AuthRoutingModule } from './auth-routing.module'

@NgModule({
  declarations: [AuthListComponent, AuthDetailComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ViewModule,
  ],
})
export class AuthModule { }
