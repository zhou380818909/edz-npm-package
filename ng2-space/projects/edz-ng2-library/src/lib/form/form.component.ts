import {
  AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver,
  Input, OnInit, QueryList, ViewChildren, ViewContainerRef,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { IFormItem } from '../../interfaces'

@Component({
  selector: 'edz-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, AfterViewInit {
  @Input()
  form: IFormItem[] | any = []

  formGroup: FormGroup
  value = {}

  @ViewChildren('componentContainer', { read: ViewContainerRef })
  components: QueryList<ViewContainerRef>

  constructor(private fb: FormBuilder, private cfr: ComponentFactoryResolver, private cdf: ChangeDetectorRef) { }

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

  /** 根据component渲染数据 */
  componentRender() {
    if (!this.components) return
    const components = [...this.components]
    this.form.forEach(item => {
      if (!item.component) {
        return
      }
      const container = components.shift()
      if (!container) return
      container.clear()
      const componentFactory = this.cfr.resolveComponentFactory(item.component)
      const componentRef = container.createComponent(componentFactory)
      const param = item.componentParam ? item.componentParam(item) : item
      Object.assign(componentRef.instance, param)
    })
  }

  ngOnInit(): void {
    this.initFormGroup()
    this.initGripLayout()
  }

  ngAfterViewInit() {
    this.componentRender()
    this.cdf.detectChanges()
  }
}
