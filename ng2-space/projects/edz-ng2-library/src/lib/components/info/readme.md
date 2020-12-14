## 信息展示组件
用来展示信息数据使用, 支持 component 和 render 自定渲染

```html
<edz-info [config]="config" [list]="list" [data]="data"></edz-info>
<ng-template #render let-data="data" let-index="index">
  <input style="height: 22px;" type="text">
</ng-template>
```
```ts
  list: IInfoItem[] = []
  config: IInfoConfig = { nzSpan: { xxl: 6, xl: 8 }, labelStyle: { width: '74px', fontSize: '12px' }, valueStyle: { fontSize: '12px' } }
  data = { name: '清风清风', age: 24 }

  @ViewChild('render', { static: true })
  renderTpl: TemplateRef<any>

  // ...

  ngOnInit() {
    this.list = [
      { label: '姓名', index: 'name', nzXXl: { span: 24 }, nzXl: { span: 24 }, nzEllipsis: true, labelStyle: { color: 'red', fontSize: '20px', width: '74px' }, valueStyle: { fontSize: '20px' } },
      { label: '年纪', index: 'age', nzXXl: { span: 12 }, nzXl: { span: 12 } },
      { label: '年纪多大', index: 'age', nzXXl: { span: 12 }, nzXl: { span: 12 } },
      { label: '年纪', index: 'age' },
      { label: '年纪', index: 'age', render: this.renderTpl },
      { label: '年纪', index: 'age' },
      { label: '年纪多大', index: 'age' },
      { label: '年纪', index: 'age' },
      { label: '年纪', index: 'age' },
      { label: '年纪', index: 'age', tips: '2123213' },
    ]
  }
```
