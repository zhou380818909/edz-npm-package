import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators'
import { IMenuItem, IMenuConfig } from '../interfaces'

interface IMenuRenderItem extends IMenuItem {
  open?: boolean
  selected?: boolean
  level?: number
  children?: IMenuRenderItem[]
  url?: string
}

@Component({
  selector: 'edz-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  @Input()
  menuList: IMenuItem[] = []

  @Input()
  config: IMenuConfig = {}
  /** 待渲染的菜单列表 */
  menus: IMenuRenderItem[] = []
  /** 路由的订阅 */
  routerSub$
  /** 前一个url地址 */
  previousUrl = ''

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  regesiterSub() {
    this.routerSub$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const currentPaths = event.url.replace(/^\//, '').split('/')
      const previousePaths = this.previousUrl.replace(/^\//, '').split('/')
      this.cdr.detach()
      this.setMenuUnActive(previousePaths)
      this.setMenuActive(currentPaths)
      this.previousUrl = event.url
      this.cdr.reattach()
    })
  }

  /** 根据传入的菜单配置生成模板需要的菜单 */
  private setMenus(list = this.menuList, level = 1, url = '') {
    this.menus = list.filter(menu => !menu.hidden).map(item => {
      const menu = { ...item, url: `${url}/${item.path}`, level, open: false }
      if (menu.children) {
        menu.children = this.setMenus(menu.children, level + 1, menu.url)
      }
      return menu
    })
    return this.menus
  }

  /**
   * 设置菜单激活以及展开
   * @param pathArr url地址数组
   * @param menus 菜单
   */
  private setMenuActive(pathArr = [], menus = this.menus) {
    const previousPath = pathArr.shift()
    menus.forEach(menu => {
      if (menu.path === previousPath) {
        if (Array.isArray(menu.children)) {
          menu.open = true
          this.setMenuActive(pathArr, menu.children)
        } else {
          menu.selected = true
        }
      }
    })
  }

  /**
   * 设置菜单不激活以及不展开
   * @param pathArr url地址数组
   * @param menus 菜单
   */
  private setMenuUnActive(pathArr = [], menus = this.menus) {
    const previousPath = pathArr.shift()
    const menuItem = menus.find(menu => menu.path === previousPath) || {} as IMenuRenderItem
    if (menuItem.children) {
      menuItem.open = false
      this.setMenuUnActive(pathArr, menuItem.children)
    } else {
      menuItem.selected = false
    }
  }

  menuHanlder(event: MouseEvent, value: IMenuRenderItem) {
    this.router.navigateByUrl(value.url)
  }

  ngOnInit(): void {
    this.regesiterSub()
    this.setMenus(this.menuList)
  }

  ngOnDestroy() {
    if (this.routerSub$ && typeof this.routerSub$.unsubscribe === 'function') {
      this.routerSub$.unsubscribe()
    }
  }
}
