import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, PRIMARY_OUTLET, Router, UrlTree } from '@angular/router'
import { BehaviorSubject, timer } from 'rxjs'
import { filter } from 'rxjs/operators'
import { IMenuConfig, IMenuItem } from '../interfaces'

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
  /** 是否切换路由时自动收起非激活菜单 */
  @Input()
  autoOpen = true
  /** 默认是否全部展开 */
  @Input()
  defaultOpen = false
  /** 待渲染的菜单列表 */
  menus: IMenuRenderItem[] = []
  /** 路由的订阅 */
  routerSub$
  /** 页面刷新时候路由事件 */
  fisrtRouterEvent$: BehaviorSubject<NavigationEnd>
  /** 前一个当前应用url地址 */
  previousUrl = ''

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.routerSub$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      if (this.menus.length > 0) {
        this.routerEvent(event)
      } else {
        this.fisrtRouterEvent$ = new BehaviorSubject(event)
      }
    })
  }

  /** 将urlTree转换成url数组 */
  private getUrlArrayFromUrlTree(urlTree: UrlTree) {
    return urlTree.root.children[PRIMARY_OUTLET].segments.map(item => item.path)
  }

  /** 根据路由事件才激活当前菜单,以及失活上一个菜单 */
  routerEvent(event: NavigationEnd) {
    const currentPaths = this.getUrlArrayFromUrlTree(this.router.parseUrl(event.urlAfterRedirects))
    const previousePaths = this.previousUrl ? this.getUrlArrayFromUrlTree(this.router.parseUrl(this.previousUrl)) : []
    this.cdr.detach()
    this.setMenuUnActive(previousePaths)
    if (this.fisrtRouterEvent$) {
      // 触发展开动画
      timer(100).subscribe(() => this.setMenuActive(currentPaths))
    } else {
      this.setMenuActive(currentPaths)
    }
    this.cdr.reattach()
    this.previousUrl = event.urlAfterRedirects
  }

  /** 根据传入的菜单配置生成模板需要的菜单 */
  private setMenus(list = this.menuList, level = 1, url = '') {
    this.menus = list.filter(menu => !menu.hidden).map(item => {
      const menu = { ...item, url: item.isBlank ? item.path : `${url}/${item.path}`, level, open: this.defaultOpen, selected: false }
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

  /** 菜单跳转 */
  menuHanlder(event: MouseEvent, value: IMenuRenderItem) {
    this.router.navigateByUrl(value.url)
  }

  ngOnInit(): void {
    this.setMenus()
    /**
     * 首次路由事件, 由于路由是和组逐级加载, 所以首次加载的路由事件只能在构造函数中访问
     * 在构造函数中menuList还没没有数据, 所以在没有数据的时候采用一个BehaviorSubject
     */
    if (this.fisrtRouterEvent$ && typeof this.fisrtRouterEvent$.subscribe === 'function') {
      this.fisrtRouterEvent$.subscribe(event => {
        this.routerEvent(event)
        this.fisrtRouterEvent$.complete()
        this.fisrtRouterEvent$ = null
      })
    }
  }

  ngOnDestroy() {
    if (this.routerSub$ && typeof this.routerSub$.unsubscribe === 'function') {
      this.routerSub$.unsubscribe()
    }
  }
}
