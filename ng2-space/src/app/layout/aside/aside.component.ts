import { Component, OnInit } from '@angular/core'
import { IMenuConfig, IMenuItem } from '../../../../projects/edz-ng2-library/src/interfaces'

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  menuList: IMenuItem[] = [
    {
      icon: 'user',
      path: 'user',
      title: '用户',
      children: [
        {
          title: '用户列表',
          path: '',
        },
      ],
    },
    {
      icon: 'dollar',
      path: 'role',
      title: '角色',
      children: [
        {
          title: '角色列表',
          path: '',
        },
      ],
    },
  ]
  menuConfig: IMenuConfig = {
    nzMode: 'inline',
  }
  constructor() { }

  collapseHandler(isCollapse) {
    this.menuConfig.nzMode = isCollapse ? 'vertical' : 'inline'
  }

  ngOnInit(): void {
  }
}
