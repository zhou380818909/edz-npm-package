import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { IMenuItem, IMenuConfig } from '../interfaces'

interface IMenuRenderItem extends IMenuItem {
  open?: boolean
  level?: number
  children?: IMenuRenderItem[]
}

@Component({
  selector: 'edz-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input()
  menuList: IMenuItem[] = []

  @Input()
  config: IMenuConfig = {
    nzMode: 'inline',
  }

  @Output()
  handler = new EventEmitter()

  constructor() {
  }

  /** 待渲染的菜单列表 */
  menus: IMenuRenderItem[] = []

  /** 根据传入的菜单配置生成模板需要的菜单 */
  private setMenus(list = this.menuList, level = 1) {
    // 暂时没有实现表头分组
    this.menus = list.map(item => {
      if (item.children) {
        return { ...item, level, open: false, children: this.setMenus(item.children, level + 1) }
      }
      return { ...item, level, open: false }
    })
    return this.menus
  }

  menuHanlder(value) {
    this.handler.emit(value)
  }

  ngOnInit(): void {
    this.setMenus(this.menuList)
  }
}
