### 表格组件
支持 `data = [{},{}], column = [{},{}]` 配置形式生成表格
- 支持表格区域滚动, 需要在config中设置scroll为true
- 支持自定义渲染 render 模板, render需要用@ViewChild装饰器, static: true, 然后在ngOnInit里面传入
- 支持自定义渲染 component 组件, 需要传入参数, componentParam
- 支持左右固定
- 支持表格单元格悬浮提示, 文字溢出隐藏, 省略, 默认不处理
- 可以带分页功能和loading功能
- 支持表头分组功能
- 暂时未完成 列选择功能
- 虚拟滚动未实现
- 导出功能未实现

```html
<edz-table [column]="tableColumn" [data]="dataList" [pagination]="pagination" [config]="tableConfig"></edz-table>

<ng-template #time let-data>
  <span>{{data | date: 'yyyy-MM-dd HH:mm:ss'}}</span>
</ng-template>

<ng-template #operate let-row="row">
  <span>
    <a routerLink="../detail/11">详情</a>
  </span>
</ng-template>

```

```ts

  tableColumn: IColumnItem[] = []
  dataList = [
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
    },
  ]
  pagination: IPagination = { pageIndex: 1, pageSize: 5, total: 50 }
  tableConfig: ITableConfig = { width: 1960 }

  @ViewChild('time', { static: true })
  timeTpl: TemplateRef<any>
  @ViewChild('operate', { static: true })
  operateTpl: TemplateRef<any>

  // ... 中间省略代码

    initRender() {
    this.tableColumn = [
      {
        title: '姓名',
        index: 'name',
        nzLeft: true,
        width: 200,
      },
      {
        title: '家庭住址',
        index: 'addresss',
        textOverflow: 'ellipsis',
        tooltip: true,
        width: 100,
      },
      {
        title: '生日',
        index: 'birthday',
        width: 140,
        component: DateComponent,
        componentParam(data) {
          return {
            date: data.birthday,
          }
        },
      },
      {
        title: '生辰',
        index: 'birthday',
        render: this.timeTpl,
        width: 200,
        selected: true,
      },
      {
        title: '家庭住址1',
        index: 'addresss',
        textOverflow: 'ellipsis',
        tooltip: true,
        width: 100,
        selected: true,
      },
      {
        title: '家庭住址2',
        index: 'addresss',
        textOverflow: 'ellipsis',
        tooltip: true,
        width: 100,
        selected: true,
      },
      {
        title: '家庭住址3',
        index: 'addresss',
        textOverflow: 'ellipsis',
        tooltip: true,
        width: 100,
        selected: true,
      },
      {
        title: '家庭住址4',
        index: 'addresss',
        textOverflow: 'ellipsis',
        tooltip: true,
        width: 100,
        selected: false,
        children: [
          {
            title: '家庭住址å',
            index: 'addresss',
            textOverflow: 'ellipsis',
            tooltip: true,
            width: 100,
          },
          {
            title: '家庭住址ß',
            index: 'addresss',
            textOverflow: 'ellipsis',
            tooltip: true,
            width: 100,
            children: [
              {
                title: '家庭住址a',
                index: 'addresss',
                textOverflow: 'ellipsis',
                tooltip: true,
                width: 100,
                children: [
                  {
                    title: '生辰',
                    index: 'birthday',
                    render: this.timeTpl,
                    width: 200,
                    selected: true,
                  },
                  {
                    title: '家庭住址1',
                    index: 'addresss',
                    textOverflow: 'ellipsis',
                    tooltip: true,
                    width: 100,
                    selected: true,
                  },
                ],
              },
              {
                title: '家庭住址b',
                index: 'addresss',
                textOverflow: 'ellipsis',
                tooltip: true,
                width: 100,
              },
            ],
          },
        ],
      },
      {
        title: '家庭住址',
        index: 'addresss',
        textOverflow: 'ellipsis',
        tooltip: true,
        width: 100,
      },
      {
        title: '家庭住址',
        index: 'addresss',
        textOverflow: 'ellipsis',
        tooltip: true,
        width: 100,
      },
      {
        title: '家庭住址',
        index: 'addresss',
        textOverflow: 'ellipsis',
        tooltip: true,
        width: 100,
      },
      {
        title: '性别',
        index: 'gender',
        nzRight: true,
        width: 120,
      },
      {
        title: '操作',
        index: 'operate',
        nzRight: true,
        render: this.operateTpl,
        selected: true,
      },
    ]
  }

  ngOnInit(): void {
    this.initRender()
  }

```

可以配合` edz-scroll edz-scroll-content search-bar table` 实现最常用的表格搜索功能

```html

<div edz-scroll>
  <edz-search-bar [config]="searchConfig" [value]="searchValue"></edz-search-bar>
  <div edz-scroll-content>
    <edz-table [column]="tableColumn" [data]="dataList" [pagination]="pagination" [config]="tableConfig"></edz-table>
  </div>
</div>


```
