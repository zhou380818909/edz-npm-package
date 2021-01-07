/*
 * @Author: ChouEric
 * @Date: 2021-01-07 17:17:45
 * @Last Modified by: ChouEric
 * @Last Modified time: 2021-01-07 17:21:16
 * @Description: 在根路由模块中当做守卫加入. 模块或者组件加载的过渡效果, 懒加载模块将会触发, 或者路由配置中的 data: { loading: true }
 */
import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateChild, UrlTree } from '@angular/router'
import { Observable, of, Subject, timer } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class LayoutLoadingGuard implements CanActivateChild {
  loading$ = new Subject<boolean>()

  canActivateChild(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (route.routeConfig?.data?.loading) {
      return of(true).pipe(switchMap(() => {
        this.loading$.next(true)
        return timer(40)
      }), map(() => true))
    }
    return true
  }
}
