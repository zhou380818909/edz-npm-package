import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Routes } from 'dev'
import { UserDetailComponent } from './user-detail/user-detail.component'
import { UserListComponent } from './user-list/user-list.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: UserListComponent,
    data: {
      title: '用户列表',
    },
  },
  {
    path: 'manage',
    component: UserListComponent,
    data: {
      title: '用户管理',
    },
  },
  {
    path: 'detail/:id',
    component: UserDetailComponent,
    data: {
      multi: true,
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
