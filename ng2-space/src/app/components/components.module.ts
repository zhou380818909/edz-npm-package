import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input'
import { InputComponent } from './input/input.component'

@NgModule({
  declarations: [InputComponent],
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
  ],
})
export class ComponentsModule { }
