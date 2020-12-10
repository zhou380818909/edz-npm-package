import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { IColumnItem, IPagination, ISearchItem, ITableConfig } from 'edz-ng2-library'
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
  tableColumn: IColumnItem[] = []
  dataList = [
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 1,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 2,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 3,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 4,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 5,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 6,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 7,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 8,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 9,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 10,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 11,
    },
    {
      name: '张三',
      addresss: '银河系太阳地球亚洲中国湖南长沙是朝阳区望京soho',
      gender: '男',
      birthday: new Date(),
      id: 12,
    },
  ]
  pagination: IPagination = { pageIndex: 1, pageSize: 5, total: 50 }
  tableConfig: ITableConfig = { width: 1720 }

  @ViewChild('time', { static: true })
  timeTpl: TemplateRef<any>
  @ViewChild('operate', { static: true })
  operateTpl: TemplateRef<any>

  constructor(private router: Router) { }

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

  /** 打开需要详情页 */
  openAllHandler() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        this.router.navigate([`../detail/${i}`])
      }, 200 * i)
    }
  }

  toggleHandler() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        if (i % 2 === 0) {
          this.router.navigate([`../detail/${i}`])
        } else {
          this.router.navigateByUrl('/user/list')
        }
      }, 200 * i)
    }
  }

  ngOnInit(): void {
    this.initRender()
  }

  ngOnDestroy() {
  }
}
