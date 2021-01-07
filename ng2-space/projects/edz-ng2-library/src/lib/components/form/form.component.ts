import {
  ChangeDetectionStrategy,
  ChangeDetectorRef, Component, ComponentFactoryResolver,

  forwardRef,
  Input, isDevMode, QueryList, SimpleChanges, ViewChildren, ViewContainerRef,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms'
import { assign } from 'lodash-es'
import { IFormConfig, IFormItem } from '../../interfaces'

@Component({
  selector: 'edz-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => FormComponent),
      multi: true,
    },
  ],
})
export class FormComponent {
  /** 表单生成的配置 */
  @Input()
  private form: IFormItem[] = []
  /** 表单配置 */
  @Input()
  private config: IFormConfig = {}

  formRender: any[] = []
  configRender: IFormConfig = { }
  private defaultConfig: IFormConfig = { labelWidth: 84 }
  private value = {}
  private changeFn: any

  /** 响应式表单 */
  formGroup: FormGroup

  @ViewChildren('componentContainer', { read: ViewContainerRef })
  components: QueryList<ViewContainerRef>

  constructor(private fb: FormBuilder, private cfr: ComponentFactoryResolver, private cdf: ChangeDetectorRef) {}

  /** 根据配置初始化表单 */
  private initFormGroup() {
    if (isDevMode()) {
      const mapIndex = this.form.map(item => item.index)
      if (new Set(mapIndex).size < mapIndex.length) {
        console.warn('表单存在相同的index')
      }
    }
    this.formGroup = this.fb.group([])
    this.formRender = [...this.form]
    this.formRender.forEach((item => {
      const validators = item.validators || []
      if (item.required) {
        validators.unshift(Validators.required)
      }
      const control = new FormControl(item.defaultValue || null, validators)
      if (item.type === 'render') {
        item.ngModelChange = value => {
          this.formGroup.controls[item.index].setValue(value)
          this.formGroup.controls[item.index].markAsDirty()
        }
      }
      control.valueChanges.subscribe(value => {
        if (typeof this.changeFn === 'function') {
          this.changeFn({ ...this.formGroup.value, [item.index]: value })
        }
      })
      this.formGroup.addControl(item.index, control)
    }))
  }

  private initGripLayout() {
    this.form.forEach(item => {
      item.nzXXl = item.nzXXl || { span: 10, offset: 6 }
      item.nzXl = item.nzXl || { span: 16, offset: 4 }
    })
  }

  /** 错误提示 */
  errorTips(control: FormControl, item: IFormItem) {
    return item?.errorTooltip[Object.keys(control?.errors || {}).find(key => control?.errors[key])] || ''
  }

  /** 校验表单返回校验结果 */
  validate = (): boolean => {
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.controls[key].markAsDirty()
      this.formGroup.controls[key].updateValueAndValidity()
    })
    return this.formGroup.valid
  }

  /** 重置表单 */
  reset = () => {
    this.formGroup.reset()
    this.formGroup.patchValue(this.value)
  }

  /** 根据component渲染数据 */
  private componentRender() {
    if (!this.components) return
    const components = [...this.components]
    this.formRender.forEach(item => {
      if (!item.component) {
        return
      }
      const container = components.shift()
      if (!container) return
      container.clear()
      const componentFactory = this.cfr.resolveComponentFactory(item.component)
      const componentRef = container.createComponent(componentFactory)
      item.componentInstance = componentRef.instance
    })
  }

  private registerOnChange(fn) {
    if (typeof fn === 'function') {
      this.changeFn = fn
      this.formGroup?.valueChanges?.subscribe(this.changeFn)
    }
  }
  private writeValue(value) {
    if (value && typeof value === 'object') {
      this.value = { ...value }
      this.formGroup?.patchValue(value)
      this.formRender.forEach(item => {
        if (item.type === 'render' && item.componentInstance) {
          Object.assign(item.componentInstance, { model: this.formGroup.value[item.index], change: item.ngModelChange })
        }
      })
    }
  }
  private registerOnTouched() {}
  private setDisabledState() {}

  private ngOnInit(): void {
    this.initFormGroup()
    this.initGripLayout()
  }

  private ngAfterViewInit() {
    this.componentRender()
    this.cdf.detectChanges()
  }

  private ngOnChanges(changes: SimpleChanges) {
    if (changes.config && changes.config.currentValue && typeof changes.config.currentValue === 'object') {
      this.configRender = assign(this.defaultConfig, changes.config.currentValue)
    }
    if (changes.form && !changes.form.firstChange && Array.isArray(changes.form.currentValue)) {
      this.componentRender()
      this.cdf.detectChanges()
    }
  }
}
