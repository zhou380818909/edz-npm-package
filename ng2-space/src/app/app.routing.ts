import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./modules/customer-management/customer-management.module').then(m => m.CustomerManagementModule),
  },
  {
    path: 'store',
    loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { errorHandler: error => {
    console.warn(error)
  } })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
