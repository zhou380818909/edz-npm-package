import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown'
import { Router, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators'
import { IMenuItem } from '../interfaces'

interface ITabItem {
  url?: string
  title?: string
}

@Component({
  selector: 'edz-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit, OnDestroy {
  @Input()
  menuList: IMenuItem[] = []

  activeIndex = 0
  tabs: ITabItem[] = []
  // 右键菜单选中的tab
  private contextMenuTab: ITabItem
  private routerSub$

  constructor(
    private nzContextMenuService: NzContextMenuService,
    private router: Router,
  ) {}

  registerSub() {
    this.routerSub$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => {
      // TODO: 未完成动态路由不缓存
      const currentPaths = event.url.replace(/^\//, '').split('/')
      const title = this.getTabTitleFromMenu(currentPaths)
      const existIndex = this.tabs.findIndex(tab => tab.title === title && tab.url === event.url)
      if (existIndex < 0 && title) {
        this.tabs.push({ url: event.url, title })
        this.activeIndex = this.tabs.length - 1
      } else {
        this.activeIndex = existIndex
      }
    })
  }

  /**
   * 从路由菜单获取tab的title
   * @param pathArr path的数组
   * @param menus 菜单
   */
  getTabTitleFromMenu(pathArr: string[], menus = this.menuList): string {
    const path = pathArr.shift()
    const menuItem = menus.find(menu => menu.path === path) || {} as IMenuItem
    if (menuItem.children) {
      return this.getTabTitleFromMenu(pathArr, menuItem.children)
    }
    return menuItem.title
  }

  /** 点击tab */
  tabHandler(tab: ITabItem) {
    this.router.navigateByUrl(tab.url)
  }

  /** 关闭tab */
  closeTab(tab: ITabItem): void {
    const closeIndex = this.tabs.indexOf(tab)
    // 如果关闭tab是当前激活的tab, 则需要打开其他tab
    if (this.activeIndex === closeIndex) {
      this.tabs.splice(closeIndex, 1)
      if (closeIndex > 0) {
        const { url } = [...this.tabs].splice(closeIndex - 1, 1)[0]
        this.router.navigateByUrl(url)
      } else {
        const { url } = [...this.tabs].splice(0, 1)[0]
        this.router.navigateByUrl(url)
      }
    }
    this.tabs.splice(this.tabs.indexOf(tab), 1)
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
    const contextIndex = this.tabs.findIndex(item => item === this.contextMenuTab)
    if (contextIndex < 0) {
      return
    }
    switch (type) {
      case 'other':
        this.contextCloseOtherTab(contextIndex)
        break
      case 'toRight':
        this.contextCloseToTab(contextIndex + 1, this.tabs.length - 1)
        break
      case 'toLeft':
        this.contextCloseToTab(0, contextIndex - 1)
        break
      default:
        break
    }
    this.contextMenuTab = null
  }

  /** 关闭范围 */
  contextCloseToTab(fromIndex, toIndex) {
    this.tabs = this.tabs.filter((item, index) => index < fromIndex || index > toIndex)
  }

  /** 关闭其他 */
  contextCloseOtherTab(index) {
    const tab = this.tabs[index]
    this.tabs = [tab]
    this.router.navigateByUrl(tab.url)
  }

  ngOnInit(): void {
    this.registerSub()
  }

  ngOnDestroy() {
    if (this.routerSub$ && typeof this.routerSub$.unsubscribe) {
      this.routerSub$.unsubscribe()
    }
  }
}
