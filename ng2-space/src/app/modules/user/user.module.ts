import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { FormModule, SearchBarModule } from '../../../../projects/edz-ng2-library/src/public-api'
import { UserDetailComponent } from './user-detail/user-detail.component'
import { UserListComponent } from './user-list/user-list.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SearchBarModule,
    FormModule,
    NzDatePickerModule,
  ],
})
export class UserModule { }
