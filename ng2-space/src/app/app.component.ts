/* eslint-disable no-console */
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { Component, OnInit, ViewChild } from '@angular/core'
import { IColumnItem, ITableConfig, IMenuItem, IMenuConfig } from '../../projects/edz-ng2-library/src/lib/interfaces'
import { TabComponent } from '../../projects/edz-ng2-library/src/lib/tab/tab.component'

registerLocaleData(zh)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng2-space'
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
  onCollapse() {
    console.log(1)
    // alert(v)
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
  }
  tableData = [
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
    {
      name: '看看',
    },
  ]
  menuList: IMenuItem[] = [
    {
      title: '一级',
      path: 'a',
      icon: 'apple',
    },
    {
      title: '二级',
      path: 'b',
      children: [
        {
          title: '2-1',
          path: '1',
        },
        {
          title: '2-2',
          path: '2',
          children: [
            {
              title: '2-2-1',
              path: 'c',
            },
          ],
        },
      ],
    },
    {
      title: '三级',
      path: 'c',
      children: [{ title: '2-2',
        path: '2',
        children: [
          {
            title: '2-2-1',
            path: 'c',
          },
        ] }],
    },

  ]
  menuConfig: IMenuConfig = {
    nzMode: 'inline',
  }

  @ViewChild(TabComponent)
  tab: TabComponent

  constructor() {}

  menuHanlder(value) {
    console.log(value)
    this.tab.createTab('新增的')
  }

  ngOnInit() {}
}
