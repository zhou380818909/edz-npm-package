import { Component, OnInit } from '@angular/core'
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown'

@Component({
  selector: 'edz-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  index = 0

  tabs = ['Tab 1', 'Tab 2222']

  constructor(private nzContextMenuService: NzContextMenuService) { }

  /** 新增tab */
  createTab(tab: string) {
    this.tabs.push(tab)
  }

  /** 关闭tab */
  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1)
  }

  /** tab的右键菜单 */
  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    const menuSub = menu.descendantMenuItemClick$.subscribe(res => {
      console.warn(res)
      menuSub.unsubscribe()
    })
    this.nzContextMenuService.create($event, menu)
  }

  /** 右键关闭tab */
  contextHandler(value) {
    console.warn(value)
  }

  ngOnInit(): void {
  }
}
