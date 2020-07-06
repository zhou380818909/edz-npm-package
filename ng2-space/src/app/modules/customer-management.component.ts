import { Component, OnInit } from '@angular/core'
import { IColumnItem, ITableConfig } from '../../../projects/edz-ng2-library/src/lib/interfaces'

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
  column: IColumnItem[] = [
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
      // nzLeft: true,
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
      width: '200px',
    },
    {
      title: '姓名',
      index: 'score',
      // width: '100px',
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
    width: '1900px',
    showCheck: true,
    checkNzLeft: true,
    scroll: true,
  }
  tableData = [
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
  constructor() { }

  ngOnInit(): void {
  }
}
