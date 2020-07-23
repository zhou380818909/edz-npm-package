import { Component } from "@angular/core";
import { IColumnItem, IMenuConfig, IMenuItem, ITableConfig } from "../../projects/edz-ng2-library/src/lib/interfaces";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [`
    :host { display: block; height: 100%; }
  `],
})
export class LayoutComponent {
  title = 'ng2-space'
  onCollapse() {
    console.log(1)
    // alert(v)
  }
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
      // nzLeft: true,
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
  menuList: IMenuItem[] = [
    {
      title: '一级',
      path: 'customer',
      icon: 'apple',
    },
    {
      title: '仓库管理',
      path: 'store',
      children: [
        {
          title: '库存列表',
          path: 'list',
        },
        {
          title: '详情',
          path: 'detail',
          children: [
            {
              title: '详情2',
              path: '1',
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

  constructor() { }

  menuHanlder(value) {
    console.log(value)
  }

  ngOnInit() {}
}
