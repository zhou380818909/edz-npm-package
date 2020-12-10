import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzCascaderModule } from 'ng-zorro-antd/cascader'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzRadioModule } from 'ng-zorro-antd/radio'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { FormComponent } from './form.component'

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzRadioModule,
  NzCheckboxModule,
  NzGridModule,
  NzCascaderModule,
  NzIconModule,
  NzToolTipModule,
]

@NgModule({
  declarations: [FormComponent],
  imports: modules,
  exports: [FormComponent, ...modules],
})
export class FormModule { }
