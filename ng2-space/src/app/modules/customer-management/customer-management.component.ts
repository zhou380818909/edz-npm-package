import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { IColumnItem, ISearchItem, ITableConfig } from '../../../../projects/edz-ng2-library/src/lib/interfaces'
import { HttpService } from '../../../../projects/edz-ng2-library/src/lib/services'

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
})
export class CustomerManagementComponent implements OnInit, OnDestroy {
  text = '13211111111'
  options = [
    { key: 'id', value: '北京' },
  ]
  date=null
  showPhone() {
    setTimeout(() => {
      this.text = '13211112222'
    }, 1000)
  }
  onBtnClick() {
    console.log(this.date)
  }
  dateChange(date) {
    console.log(date)
  }
  searchValue = { city: '2' } as any
  searchBarConfig: ISearchItem[] = []
  column: IColumnItem[] = []
  tableConfig: ITableConfig = {
    scroll: true,
    width: '2600px',
  }
  tableData = [
    {
      name: '看看',
      score: '清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风',
      id: 1,
      style: { color: 'red' },
    },
    {
      name: '看看',
      score: '清风',
      id: 2,
    },
    {
      name: '看看',
      score: '清风',
      id: '3',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
  ]

  dateValue = null

  @ViewChild('date', { static: true })
  dateComponent
  @ViewChild('ellipsis', { static: true })
  ellipsisComponent

  constructor(private http: HttpService) {
    // this.http.post('http://localhost:3000/posts', { query: { a: 1 }, json: [{ b: 1 }] }).subscribe(() => {})
  }

  initRender() {
    this.column = [
      // {
      //   title: '',
      //   index: 'id',
      //   nzShowCheckbox: true,
      //   nzLeft: true,
      //   width: '48px',
      // },
      {
        title: '姓名',
        index: 'name',
        nzLeft: true,
        width: '300px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
        textOverflow: 'ellipsis',
        lineCamp: 2,
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
      },
      {
        title: '姓名',
        index: 'score',
        width: '100px',
        nzRight: true,
        textOverflow: 'ellipsis',
        tooltip: true,
        lineCamp: 3,
      },
      {
        title: '姓名1',
        index: 'score',
        width: '200px',
        nzRight: true,
      },
    ]
  }

  searchHandler(value) {
    this.searchValue = value
    console.log(value)
  }

  initSearch() {
    this.searchBarConfig = [
      { label: '姓名', index: 'name', type: 'input', defaultValue: '丛丛' },
      { label: '城市', index: 'city', type: 'select', options: [{ value: '1', label: '衡水' }, { value: '2', label: '株洲' }] },
      { label: '时间', index: 'date', type: 'render', render: this.dateComponent, defaultValue: new Date('2000/09/12 20:20:20') },
    ]
  }

  clickHandler(e) {
    console.log(e);
  }

  ngOnInit(): void {
    this.initSearch()
    this.initRender()
    setTimeout(() => {
      console.log(this.searchValue);
    }, 8000)
    // setTimeout(() => {
    //   this.tableConfig = {
    //     ...this.tableConfig,
    //     totalData: [{ name: '总数1', score: 11 }, { name: '总数2', score: 66 }],
    //   }
    // }, 5000)
    this.http.get('http://localhost:3000/api/', {}, { callback: console.log, }).subscribe(() => {})
  }

  ngOnDestroy() {
    console.log('customer-destroy')
  }
}
