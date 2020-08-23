import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzDatePickerModule, NzToolTipModule, NzTypographyModule } from 'ng-zorro-antd'
import { EdzNg2LibraryModule } from '../../../../projects/edz-ng2-library/src/lib/edz-ng2-library.module'
import { CustomerManagementRoutingModule } from './customer-management-routing.module'
import { CustomerManagementComponent } from './customer-management.component'
import { Info } from './info.component'
import { Summary } from './sumary.component'


@NgModule({
  declarations: [CustomerManagementComponent, Summary, Info],
  imports: [
    CommonModule,
    CustomerManagementRoutingModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzTypographyModule,
    EdzNg2LibraryModule,
    FormsModule,
  ],
  entryComponents: [Summary, Info],
})
export class CustomerManagementModule { }
