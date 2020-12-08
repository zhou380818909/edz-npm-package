import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzInputModule } from 'ng-zorro-antd/input'
import { DatePickerComponent } from './date-picker/date-picker.component'
import { DateComponent } from './date/date.component'
import { InputComponent } from './input/input.component'

@NgModule({
  declarations: [InputComponent, DateComponent, DatePickerComponent],
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    NzDatePickerModule,
  ],
})
export class ComponentsModule { }
