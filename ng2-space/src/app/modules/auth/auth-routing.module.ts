import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Routes } from 'dev'
import { AuthDetailComponent } from './auth-detail/auth-detail.component'
import { AuthListComponent } from './auth-list/auth-list.component'

const routes: Routes = [
  {
    path: 'list',
    component: AuthListComponent,
  },
  {
    path: ':id',
    component: AuthDetailComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
