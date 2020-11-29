import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input'
import { DateComponent } from './date/date.component'
import { InputComponent } from './input/input.component'

@NgModule({
  declarations: [InputComponent, DateComponent],
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
  ],
})
export class ComponentsModule { }
