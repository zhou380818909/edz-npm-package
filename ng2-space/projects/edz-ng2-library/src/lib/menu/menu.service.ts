import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  select$ = new Subject()
  constructor() {}

  // 点击事件
  getMenuSelect() {
    return this.select$
  }

  // 设置点击事件
  setMenuSelect(value) {
    this.select$.next(value)
  }
}
