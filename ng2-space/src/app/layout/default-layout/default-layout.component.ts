import { Component, OnInit } from '@angular/core'
import { IMenuConfig, IMenuItem } from 'dev'

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  menuList: IMenuItem[] = [
    {
      icon: 'user',
      path: 'user',
      title: '用户',
      children: [
        {
          title: '用户列表',
          path: 'list',
        },
        {
          title: '用户管理',
          path: 'manage',
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
          path: 'list',
        },
      ],
    },
    {
      icon: 'home',
      path: 'auth',
      title: '权限管理',
      children: [
        {
          title: '权限列表',
          path: 'list',
        },
      ],
    },
  ]
  menuConfig: IMenuConfig = {
    nzMode: 'inline',
  }
  collapse = false
  constructor() { }

  collapseHandler(isCollapse) {
    this.menuConfig.nzMode = isCollapse ? 'vertical' : 'inline'
    this.collapse = isCollapse
  }

  ngOnInit(): void {
  }
}
