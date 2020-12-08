import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { DirectivesModule, FormModule, SearchBarModule, TableModule } from '../../../../projects/edz-ng2-library/src/public-api'
import { ComponentsModule } from '../../components/components.module'
import { UserDetailComponent } from './user-detail/user-detail.component'
import { UserListComponent } from './user-list/user-list.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [UserListComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SearchBarModule,
    TableModule,
    FormModule,
    NzDatePickerModule,
    ComponentsModule,
    DirectivesModule,
  ],
})
export class UserModule { }
