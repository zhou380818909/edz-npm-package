import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NzDatePickerModule, NzRadioModule } from 'ng-zorro-antd'
import { GroupDatepickerComponent } from './group-datepicker.component'

@NgModule({
  declarations: [GroupDatepickerComponent],
  imports: [CommonModule, BrowserAnimationsModule, NzRadioModule, NzDatePickerModule, FormsModule],
  exports: [GroupDatepickerComponent, NzRadioModule, NzDatePickerModule, FormsModule],
})
export class GroupDatepickerModule {}
