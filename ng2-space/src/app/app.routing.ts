import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout.component'
import { FullScreenComponent } from './layout/full-screen/full-screen.component'

const routes: Routes = [
  {
    path: 'login',
    component: FullScreenComponent,
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    data: {
      noCache: true,
    },
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'customer',
        pathMatch: 'prefix',
      },
      {
        path: 'customer',
        loadChildren: () => import('./modules/customer-management/customer-management.module').then(m => m.CustomerManagementModule),
      },
      {
        path: 'store',
        loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule),
      },
      {
        path: 'user',
        loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { errorHandler: error => {
    console.warn(error)
  } })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
