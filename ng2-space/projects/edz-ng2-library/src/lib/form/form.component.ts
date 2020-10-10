import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { IFormItem } from '../../interfaces'

@Component({
  selector: 'edz-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input()
  form: IFormItem[] | any = []

  formGroup: FormGroup
  value = {}

  constructor(private fb: FormBuilder) { }

  /** 根据配置初始化表单 */
  initFormGroup() {
    this.formGroup = this.fb.group([])
    this.form.forEach((item => {
      const validators = item.validators || []
      if (item.required) {
        validators.unshift(Validators.required)
      }
      this.formGroup.addControl(item.index, new FormControl(item.defaultValue || null, validators))
      if (item.type === 'render') {
        item.change = value => {
          this.formGroup.controls[item.index].setValue(value)
          this.formGroup.controls[item.index].markAsDirty()
          this.formGroup.controls[item.index].updateValueAndValidity()
        }
      }
    }))
  }

  initGripLayout() {
    this.form.forEach(item => {
      item.nzXXl = item.nzXXl || { span: 10, offset: 6 }
      item.nzXl = item.nzXXl || { span: 16, offset: 4 }
      item.labelWidth = item.labelWidth || 80
    })
  }

  /** 错误提示 */
  errorTips(control: FormControl, item: IFormItem) {
    return item?.errorTooltip[Object.keys(control?.errors || {}).find(key => control?.errors[key])] || ''
  }

  ngOnInit(): void {
    this.initFormGroup()
    this.initGripLayout()
  }
}
