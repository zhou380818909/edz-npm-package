import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoleListComponent } from './role-list/role-list.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
  },
  {
    path: 'list',
    component: RoleListComponent,
    data: {
      title: '角色列表',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule { }
