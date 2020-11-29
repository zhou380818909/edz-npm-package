import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
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
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
