import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TabService {
  close$ = new Subject()

  constructor() {}

  /** 关闭当前tab页 */
  closeCurrentTab() {
    this.close$.next()
  }
}
