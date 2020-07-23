import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout.component'

const routes: Routes = [
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
