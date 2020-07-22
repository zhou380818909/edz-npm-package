import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
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
  {
    path: '**',
    redirectTo: 'customer',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { errorHandler: error => {
    console.warn(error)
  } })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
