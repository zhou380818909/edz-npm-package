import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TabService {
  close$ = new Subject()
  title$ = new Subject<{ title: string, url: string }>()

  constructor() {}

  /** 关闭当前tab页 */
  closeCurrentTab() {
    this.close$.next()
  }

  /**
   * 更新当前tab的title, 此处有bug, 如果
   * @param title
   */
  updateTabTitle(title: string, activatedRoutes: ActivatedRoute[]) {
    this.title$.next({ title, url: this.getUrl(activatedRoutes) })
  }

  private getUrl(activatedRoutes: any[]) {
    return [...activatedRoutes].pop()._routerState.snapshot.url
  }

  private transferPathFromRootToUrl(activatedRoutes: ActivatedRoute[]) {
    return activatedRoutes.reduce((pre, cur) => {
      if (cur.snapshot.url.length < 1) {
        return pre
      }
      return `${pre}/${cur.snapshot.url.reduce((itemPre, curCur) => `${itemPre}/${curCur.path}`, '')}`
    }, '')
  }
}
