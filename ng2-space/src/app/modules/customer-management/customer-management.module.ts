import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzDatePickerModule, NzTypographyModule, NzToolTipModule } from 'ng-zorro-antd'

import { CustomerManagementRoutingModule } from './customer-management-routing.module'
import { CustomerManagementComponent } from './customer-management.component'
import { EdzNg2LibraryModule } from '../../../../projects/edz-ng2-library/src/lib/edz-ng2-library.module'

@NgModule({
  declarations: [CustomerManagementComponent],
  imports: [
    CommonModule,
    CustomerManagementRoutingModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzTypographyModule,
    EdzNg2LibraryModule,

  ],
})
export class CustomerManagementModule { }
