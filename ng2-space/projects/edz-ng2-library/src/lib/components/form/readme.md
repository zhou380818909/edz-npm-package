### 表单组件
根据配置生成表单组件,支持布局,可以获取到 formGroup , 可以获取到表单值和校验表单. 支持的type类型有input,select,radio,cascader,以及render自定义组件, component
-  配置
```ts
  form: IFormItem[] = [
    {
      label: '姓名',
      index: 'name',
      type: 'input',
      required: true,
      defaultValue: '张三',
      nzXXl: { offset: 2, span: 22 },
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
      tooltip: '邮箱号以后可以修改',
    },
    {
      label: '行吧',
      index: 'sex',
      placeholder: '请选择',
      type: 'select',
      options: [{ value: 1, label: '难' }],
      nzAllowClear: true,
      nzShowSearch: true,
      required: true,
      nzXXl: { span: 10, offset: 2 },
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
      index: 'hobby',
      type: 'render',
      component: InputComponent,
      required: true,
      nzXXl: { span: 10, offset: 2 },
    },
  ]
```
!!!注意: render双向数据绑定
```html
<ng-template #date let-model="model" let-change="change">
  <!-- 双向数据绑定 -->
  <nz-date-picker [ngModel]="model" (ngModelChange)="change($event)"></nz-date-picker>
</ng-template>
```
- 组件内表格使用form组件,响应式表单数据
```ts
  const { formGroup: { controls } } = this.formComponent
  Object.keys(controls).forEach(key => {
    controls[key].markAsDirty()
    controls[key].updateValueAndValidity()
  })
  // 是否校验通过
  this.formComponent.formGroup.valid
  // 是否校验不通过
  this.formComponent.formGroup.invalid
  // 表单数据
  this.formComponent.formGroup.value
```
