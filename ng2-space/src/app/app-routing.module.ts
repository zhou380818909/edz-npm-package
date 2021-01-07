import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutLoadingGuard } from 'dev'
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component'

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [LayoutLoadingGuard],
    children: [
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
      },
      {
        path: 'role',
        loadChildren: () => import('./modules/role/role.module').then(m => m.RoleModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'prefix',
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
