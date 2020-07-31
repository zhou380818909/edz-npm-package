import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { UserDetailComponent } from "./user-detail.component";
import { UserInfoComponent } from "./user-info.component";
import { UserListComponent } from "./user-list.component";

const routes: Route[] = [
  {
    path: 'list',
    component: UserListComponent,
  },
  {
    path: 'detail',
    children: [
      {
        path: ':id',
        component: UserDetailComponent,
        data: {
          // multi: true,
          title: '用户详情',
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
      },
      {
        path: 'chou',
        component: UserInfoComponent,
      },
    ],
  },
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UserRouting {}
