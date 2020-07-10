import { Component, OnInit, ViewChild } from '@angular/core'
import { IColumnItem, ITableConfig, ISearchItem } from '../../../../projects/edz-ng2-library/src/lib/interfaces'

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
})
export class CustomerManagementComponent implements OnInit {
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
  column: IColumnItem[] = [
    {
      title: '',
      index: 'id',
      nzShowCheckbox: true,
      nzLeft: true,
      width: '48px',
    },
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
      nzLeft: true,
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
      // width: '200px',
    },
    {
      title: '姓名',
      index: 'score',
      width: '100px',
      nzRight: true,
    },
    {
      title: '姓名1',
      index: 'score',
      width: '200px',
      nzRight: true,
    },
  ]
  tableConfig: ITableConfig = {
    width: '2200px',
    scroll: true,
  }
  tableData = [
    {
      name: '看看',
      score: '清风',
      id: 1,
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

  constructor() { }

  searchHandler(value) {
    this.searchValue = value
    console.log(value)
  }

  initSearch() {
    this.searchBarConfig = [
      { label: '姓名', index: 'name', type: 'input', defaultValue: '明月' },
      { label: '城市', index: 'city', type: 'select', options: [{ value: '1', label: '承德' }, { value: '2', label: '株洲' }] },
      { label: '时间', index: 'date', type: 'render', render: this.dateComponent, defaultValue: new Date('2000/09/12 20:20:20') },
    ]
  }

  ngOnInit(): void {
    this.initSearch()
    setTimeout(() => {
      this.searchValue = {}
    }, 3000)
  }
}
