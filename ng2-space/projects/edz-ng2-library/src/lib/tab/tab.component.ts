/*
 * @Author: ChouEric
 * @Date: 2020-07-15 11:39:46
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-08-23 20:41:39
 * @Description: tab组件, 和路径相关, 在Router中,可以访问路由复用策略
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown'
import { BehaviorSubject, Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { IMenuItem, Route } from '../interfaces'
import { LocalStorageService } from '../services/local-storage.service'
import { RouterService } from '../services/router.service'
import { SessionStorageService } from '../services/session-storage.service'
import { TabService } from './tab-service.service'

interface ITabItem {
  /** url地址 */
  url: string
  /** 含有动态路由参数的url */
  urlWithParam?: string
  /** 在tab显示的标签名 */
  title?: string
  /** 禁用关闭 */
  disableClose?: boolean
  /** 不同路径对应相同组件的组件 */
  component?: any
}

@Component({
  selector: 'edz-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit, OnDestroy {
  @Input()
  menuList: IMenuItem[] = []
  /** 是否使用浏览器本地缓存储存tab列表 */
  @Input()
  useStorage: 'session' | 'local' | 'none' = 'session'
  // 当前激活的tab的索引
  activeIndex = 0
  // 当前的菜单数量
  tabs: ITabItem[]
  // 右键菜单选中的tab
  private contextMenuTab: ITabItem
  // 用来取消订阅
  private routerSub$: Subscription
  // 首次路由
  private firstRouterEvent$: BehaviorSubject<NavigationEnd>
  constructor(
    private nzContextMenuService: NzContextMenuService,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private localStorage: LocalStorageService,
    private service: TabService,
    private routerService: RouterService,
  ) {
    this.routerSub$ = this.router.events.pipe(
      // 当前路由事件已经完成了切换
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      if (!this.tabs) {
        this.firstRouterEvent$ = new BehaviorSubject(event)
        return
      }
      this.routerEvent(event)
    })
    // 关闭当前激活的tab
    service.close$.subscribe(() => {
      const item = this.tabs ? this.tabs[this.activeIndex] : null
      if (item) {
        this.closeTab(item)
      }
    })
  }

  /** 根据路由事件来打开tab或者设置为激活, 或者关闭 */
  routerEvent(event: NavigationEnd) {
    // 根据url地址转换为数组
    const currentPaths = this.routerService.getPathArrayFromUrl(event.urlAfterRedirects)
    // 从路由配置中获取最后一级路由配置Route
    const route = this.routerService.getLastRouteConfigFromRouteConfig(this.router.config[0], currentPaths) || {} as Route
    const { data: { title = '未命名', disableClose = false, hiddenInTab = false, multi = false } = {}, path } = route
    if (hiddenInTab) {
      return
    }
    // 从路由配置中获取从根路由到最后一级的路由配置
    const rootFromPath = this.routerService.getDeepRouteConfigFromRouteConfig(this.router.config[0], currentPaths)
    // 当前的url路径(去掉了query等参数)
    const url = this.routerService.getPathFromUrl(event.urlAfterRedirects)
    // 当前的url路径(去掉了query参数, 由路由配置拼接的, 包含路径参数)
    let urlWithParam: string
    // 如果路径以:开头则代表路径为动态参数并且multi(多开参数不为truth), 则只生成一个tab, 从路由配置中获取url拼接
    if (path.startsWith(':') && !multi) {
      urlWithParam = rootFromPath.reduce((pre, cur) => pre += cur.path ? `/${cur.path}` : '', '')
    }
    // 当前的url在tab中的索引
    const existIndex = this.tabs.findIndex(tab => tab.title === title
      && ((urlWithParam && urlWithParam === tab.urlWithParam) || tab.url === url))
    // 如果当前url的索引小于0, 即是当前url不在tab中
    if (existIndex < 0 && title) {
      const tab = { url, title, disableClose } as ITabItem
      if (urlWithParam) {
        tab.urlWithParam = urlWithParam
      }
      this.tabs.push(tab)
      this.activeIndex = this.tabs.length - 1
      this.saveTabToStorage()
    } else {
      this.activeIndex = existIndex
    }
  }

  /** 点击tab */
  tabHandler(tab: ITabItem) {
    this.router.navigateByUrl(tab.url)
  }

  /** 关闭tab */
  closeTab(tab: ITabItem, event?: MouseEvent): void {
    if (event) {
      // 关闭按钮阻止事件冒泡
      event.stopPropagation()
    }

    const closeIndex = this.tabs.indexOf(tab)
    // 如果关闭tab是当前激活的tab, 则需要打开其他tab, 并删除其他tab对应的路由复用数据缓存
    if (this.activeIndex === closeIndex) {
      this.tabs.splice(closeIndex, 1)
      // 如果关闭的tab不是第一个, 则打开上一个tab
      if (closeIndex > 0) {
        const { url } = [...this.tabs].splice(closeIndex - 1, 1)[0]
        this.router.navigateByUrl(url).then(() => {
          this.deleteHandlerByUrl(tab.url)
        })

      // 如果关闭的是第一个, 则打开下一个tab
      } else {
        const { url } = [...this.tabs].splice(0, 1)[0]
        this.router.navigateByUrl(url).then(() => {
          this.deleteHandlerByUrl(tab.url)
        })
      }
      this.saveTabToStorage()

      // 如果关闭的tab不是当前激活的tab, 则删除其他tab对应的路由复用数据缓存
    } else {
      this.deleteHandlerByUrl(tab.url)
      this.tabs.splice(this.tabs.indexOf(tab), 1)
      this.saveTabToStorage()
    }
  }

  /** tab的右键菜单 */
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, tab: ITabItem): void {
    // 如果tab长度小于2, 则不生成右键菜单
    if (this.tabs.length < 2) {
      return
    }
    const menuSub = menu.descendantMenuItemClick$.subscribe(() => {
      this.contextMenuTab = tab
      menuSub.unsubscribe()
    })
    this.nzContextMenuService.create($event, menu)
  }

  /** 右键关闭tab事件 */
  contextHandler(type: 'other' | 'toRight' | 'toLeft') {
    // 点击关闭的tab的索引
    const contextIndex = this.tabs.findIndex(item => item === this.contextMenuTab)
    if (contextIndex < 0) {
      return
    }
    switch (type) {
      case 'other':
        this.contextCloseOtherTab(contextIndex)
        break
      case 'toRight':
        // 关闭到右边, 就是当前索引+1, 到数组的最后一个数据
        this.contextCloseToTab(contextIndex + 1, this.tabs.length - 1)
        break
      case 'toLeft':
        // 关闭到左边, 就是当前数组第一个, 到当前索引-1
        this.contextCloseToTab(0, contextIndex - 1)
        break
      default:
        break
    }
    this.contextMenuTab = null
  }

  /** 关闭范围 */
  contextCloseToTab(fromIndex, toIndex) {
    const closedUrls = []
    this.tabs = this.tabs.filter((item, index) => {
      if (index >= fromIndex && index <= toIndex && !item.disableClose) {
        closedUrls.push(item.url)
      }
      return item.disableClose || index < fromIndex || index > toIndex
    })
    this.saveTabToStorage()
    this.router.navigateByUrl(this.contextMenuTab.url).then(() => {
      this.deleteHandlerByUrl(closedUrls)
    })
  }

  /** 关闭其他 */
  contextCloseOtherTab(index) {
    const closedUrls = this.tabs.filter(item => !item.disableClose).filter((item, ind) => ind !== index).map(item => item.url)
    const tab = this.tabs[index]
    const disableCloseTabs = this.tabs.filter(item => item.disableClose)
    if (disableCloseTabs.findIndex(item => item.url === tab.url) > -1) {
      this.tabs = disableCloseTabs
    } else {
      this.tabs = [...disableCloseTabs, tab]
    }
    this.saveTabToStorage()
    this.router.navigateByUrl(tab.url).then(() => {
      this.deleteHandlerByUrl(closedUrls)
    })
  }

  /** 通过tab的url销毁路由复用的中的实例 */
  deleteHandlerByUrl(urls: string | string[]) {
    if (this.router && this.router.routeReuseStrategy
       && typeof (this.router.routeReuseStrategy as any).deleteHandlerByUrl === 'function'
    ) {
      (this.router.routeReuseStrategy as any)?.deleteHandlerByUrl(urls)
    }
  }

  /** 将tabs存入缓存 */
  private saveTabToStorage() {
    if (this.useStorage === 'none') return
    if (this.useStorage === 'session') {
      this.sessionStorage.setItem('TAB_LIST', this.tabs)
      return
    }
    if (this.useStorage === 'local') {
      this.localStorage.setItem('TAB_LIST', this.tabs)
    }
  }

  /** 从缓存获取tabs */
  private getTabFromStorage() {
    if (this.useStorage === 'session') {
      return this.sessionStorage.getItem('TAB_LIST') || []
    }
    if (this.useStorage === 'local') {
      return this.localStorage.getItem('TAB_LIST') || []
    }
    return []
  }

  ngOnInit(): void {
    const tabs = this.getTabFromStorage()
    if (Array.isArray(tabs)) {
      this.tabs = tabs
    }
    // 首次路由事件触发, 能够激活tab
    if (this.firstRouterEvent$ && typeof this.firstRouterEvent$.subscribe === 'function') {
      this.firstRouterEvent$.subscribe((event: NavigationEnd) => {
        this.routerEvent(event)
        this.firstRouterEvent$.complete()
        this.firstRouterEvent$ = null
      })
    }
  }

  ngOnDestroy() {
    if (this.routerSub$ && typeof this.routerSub$.unsubscribe === 'function') {
      this.routerSub$.unsubscribe()
    }
  }
}
