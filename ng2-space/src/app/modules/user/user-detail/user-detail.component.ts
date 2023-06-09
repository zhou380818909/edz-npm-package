import { DemoService } from '@/services/demo.service'
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { FormComponent, IFormConfig, IFormItem, TabService } from 'dev'
import { of, timer } from 'rxjs'
import { InputComponent } from '../../../components/input/input.component'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  formConfig: IFormItem[] = []
  config: IFormConfig = { labelWidth: 120 }
  formValue = {
    name: '李四',
    mobile: '13112341234',
    birthday: new Date(),
    hobby: 'aaa',
    sex: 1,
  }
  @ViewChild(FormComponent)
  formComponent: FormComponent
  @ViewChild('date', { static: true })
  dateTpl: TemplateRef<any>

  disable = false

  constructor(private tabService: TabService, private activatedRoute: ActivatedRoute, private demo: DemoService) { }

  formHandler() {
    const { validate } = this.formComponent
    // this.formComponent.formGroup.controls.name.setValue('aaa')
    if (!validate()) return
    // eslint-disable-next-line no-console
    console.log(this.formComponent.formGroup.valid, this.formComponent.formGroup.value, this.formValue)
  }

  initRender() {
    this.formConfig = [
      {
        label: '姓名',
        index: 'name',
        type: 'input',
        required: true,
        defaultValue: '张三',
        nzXXl: { offset: 2, span: 22 },
        labelWidth: 60,
        readonly: true,
      },
      {
        label: '手机号',
        index: 'mobile',
        type: 'input',
        required: true,
        placeholder: '请输入联系方式',
        validators: [Validators.pattern(/^1[3-9][0-9]{9}$/)],
        errorTooltip: { pattern: '手机格式不正确' },
        nzXXl: { offset: 2, span: 22 },
      },
      {
        label: '邮箱',
        index: 'mail',
        type: 'input',
        required: false,
        validators: [Validators.required, Validators.email, Validators.maxLength(20)],
        errorTooltip: { email: '邮箱格式不正确', maxlength: '不能超过20个字符' },
        nzXXl: { offset: 2, span: 22 },
        defaultValue: '111',
        tooltip: '邮箱号以后可以修改',
      },
      {
        label: '性别',
        index: 'sex',
        placeholder: '请选择',
        type: 'select',
        options: [{ value: 1, label: '难' }],
        nzAllowClear: true,
        nzShowSearch: true,
        required: true,
        nzXXl: { span: 10, offset: 2 },
        readonly: true,
      },
      {
        label: '性别',
        index: 'gender',
        type: 'radio',
        required: true,
        options$: of([{ label: '男', value: 1 }, { label: '女', value: 2 }, { label: '人妖', value: 3 }]),
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '出生地',
        index: 'area',
        type: 'cascader',
        required: true,
        // eslint-disable-next-line max-len
        options: [{ label: '河北', value: '002', children: [{ label: '承德', value: '002-1', isLeaf: true }] }, { label: '湖南', value: '003', isLeaf: true }],
        defaultValue: ['002', '002-1'],
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '出生日期',
        index: 'birthday',
        type: 'render',
        required: true,
        render: this.dateTpl,
        defaultValue: new Date(),
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby1',
        type: 'input',
        required: true,
        nzXXl: { span: 10, offset: 2 },
        maxLength: 10,
        minLength: 6,
      },
      {
        label: '爱好',
        index: 'hobby2',
        type: 'render',
        component: InputComponent,
        componentParam: { type: '111' },
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby3',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby4',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby5',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby6',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby7',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby8',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby9',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby10',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby11',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby12',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby13',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby14',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
      {
        label: '爱好',
        index: 'hobby15',
        type: 'render',
        component: InputComponent,
        required: true,
        nzXXl: { span: 10, offset: 2 },
      },
    ]
  }

  ngOnInit(): void {
    this.initRender()
    // eslint-disable-next-line no-console
    this.demo.demo().subscribe(console.log)
    this.tabService.updateTabTitle(`新建一个用户${Math.random().toString(16).substr(2, 2)}`, this.activatedRoute.pathFromRoot)
    timer(3000).subscribe(() => {
      this.formConfig = this.formConfig.map((item, index) => {
        if (index === 0) {
          return {
            ...item,
            readonly: false,
            disabled: true,
          }
        }
        return item
      })
    })
  }

  ngOnDestroy() {
    this.formConfig = null
    this.formConfig = { ...this.formConfig }
    this.config = null
    this.formValue = null
    this.formComponent = null
    this.dateTpl = null
    this.formHandler = null
    this.initRender = null
  }
}
