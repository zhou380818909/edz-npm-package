## 搜索栏组件
一般用于和table组件结合使用, 作为table组件的搜索条件

```html
<div edz-scroll>
  <edz-search-bar [config]="searchConfig" [loading]="loading [value]="searchValue" (search)="searchHandler($event)" (reset)="resetHandler($event)">
    <!-- 这里加入 其他的 button 等 -->
  </edz-search-bar>
  <!-- <edz-table edz-scroll-content [column]="tableColumn" [data]="dataList" [pagination]="pagination" [config]="tableConfig"></edz-table> -->
</div>
```
```ts
  loading = false
  searchConfig: ISearchItem[] = [
    {
      label: '姓名',
      type: 'input',
      index: 'name',
      defaultValue: '李四',
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
    {
      label: '年纪',
      type: 'input',
      index: 'age',
      defaultValue: 11,
    },
  ]
  searchValue = {}


  searchHandler(value) {
    // eslint-disable-next-line no-console
    console.dir(value)
  }

  resetHandler(value) {
    // eslint-disable-next-line no-console
    console.dir(value)
  }

```
