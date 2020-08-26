import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CustomerManagementComponent } from './customer-management.component'

const routes: Routes = [
  {
    path: '',
    component: CustomerManagementComponent,
    data: {
      title: '一级(来自data)',
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerManagementRoutingModule { }
