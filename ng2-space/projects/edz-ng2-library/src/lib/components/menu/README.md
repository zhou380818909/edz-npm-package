## 菜单组件
实现菜单的功能, 可以通过修改 config.nzMode 来切换菜单展示形式

```html
<edz-menu [menuList]="menuList" [config]="menuConfig"></edz-menu>
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

```
