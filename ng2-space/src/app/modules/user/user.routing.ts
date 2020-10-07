import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Route } from '../../../../projects/edz-ng2-library/src/public-api'
import { UserDetailComponent } from './user-detail.component'
import { UserInfoComponent } from './user-info.component'
import { UserListComponent } from './user-list.component'

const routes: Route[] = [
  {
    path: 'list',
    component: UserListComponent,
    data: {
      title: '用户列表',
    },
  },
  {
    path: 'detail',
    children: [
      {
        path: ':id',
        component: UserDetailComponent,
        data: {
          multi: true,
          noCache: true,
          title: '用户详情(动态参数, 不缓存)',
        },
      },
    ],
  },
  {
    path: 'info',
    children: [
      {
        path: 'eric',
        component: UserInfoComponent,
        data: {
          title: '用户详情(eric)',
        },
      },
      {
        path: 'chou',
        component: UserInfoComponent,
        data: {
          title: '用户详情(chou)',
        },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRouting {}
