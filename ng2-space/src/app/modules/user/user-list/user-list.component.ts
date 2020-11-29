import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { IColumnItem, IPagination, ISearchItem, ITableConfig } from '../../../../../projects/edz-ng2-library/src/interfaces'
import { DateComponent } from '../../../components/date/date.component'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
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
  ]
  searchValue = {}
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
  tableConfig: ITableConfig = { width: 1720 }

  @ViewChild('time', { static: true })
  timeTpl: TemplateRef<any>
  @ViewChild('operate', { static: true })
  operateTpl: TemplateRef<any>

  constructor() { }

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
        width: 100,
      },
      {
        title: '操作',
        index: 'operate',
        nzRight: true,
        render: this.operateTpl,
      },
    ]
  }

  ngOnInit(): void {
    this.initRender()
  }

  ngOnDestroy() {
  }
}
