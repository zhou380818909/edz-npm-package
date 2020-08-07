import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerManagementComponent } from './customer-management.component'

const routes: Routes = [
  {
    path: '',
    component: CustomerManagementComponent,
    data: {},
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManagementRoutingModule { }
