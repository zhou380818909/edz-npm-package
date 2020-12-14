## 布局组件
能够配合 menu 和 tab 组件 实现常见的侧边栏布局, 路由出口在本组件当中自带
```html
<edz-layout [isCollapsed]="collapse">
  <edz-menu [menuList]="menuList" [config]="menuConfig"></edz-menu>
  <edz-header [isCollapsed]="collapse" (collapse)="collapseHandler($event)">
    &nbsp;&nbsp;&nbsp;&nbsp; <span>这是是占位符</span>
  </edz-header>
  <edz-tab [menuList]="menuList"></edz-tab>
</edz-layout>
```
```ts
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
  ]
  menuConfig: IMenuConfig = {
    nzMode: 'inline',
  }
  collapse = false

  collapseHandler(isCollapse) {
    this.menuConfig.nzMode = isCollapse ? 'vertical' : 'inline'
    this.collapse = isCollapse
  }
```
