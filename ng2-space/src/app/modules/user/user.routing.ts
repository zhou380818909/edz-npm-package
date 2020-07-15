import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { UserListComponent } from "./user-list.component";
import { UserDetailComponent } from "./user-detail.component";
import { UserInfoComponent } from "./user-info.component";

const routes: Route[] = [
  {
    path: 'list',
    component: UserListComponent,
  },
  {
    path: 'detail/:id',
    component: UserDetailComponent,
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
