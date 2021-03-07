/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-else-return */
/* eslint-disable prefer-destructuring */
/*
 * @Author: ChouEric
 * @Date: 2019-12-08 10:41:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2021-03-07 22:34:25
 * @Description: 路由复用策略, 目前angular在多个页面中跳转内存会持续增加,和路由复用无关,应该和虚拟dom有关
 * // TODO: 未完成路由通配符  path-to-regexp
 */
import { ComponentRef, Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy } from '@angular/router'
import { Subject } from 'rxjs'

interface IHandler extends Route {
  /** 详情页多开 */
  multi?: boolean
  /** 详情页多开路径 */
  url?: string
}

/**
 * 路由复用服务的缓存大小
 * @example { provide: ROUTER_REUSE_CACHE_SIZE, useValue: 50 }
 */
export const ROUTER_REUSE_CACHE_SIZE = new InjectionToken('ROUTER_REUSE_CACHE_SIZE')
/**
 * 路由复用服务, 注入实现路由缓存功能
 * @example { provide: RouteReuseStrategy, useClass: RouteReuseService }
 */
@Injectable({
  providedIn: 'root',
})
export class RouteReuseService implements RouteReuseStrategy {
  /** 缓存数据-不带参数的 */
  static handlers: Map<Route, any > = new Map()
  /** 缓存数据-带路由参数 */
  static handlersWithParam: Map<string, any> = new Map()
  /** url地址和路由配置的映射, 主要是用于对外通过url来查找到对应路由配置 */
  static urlRoutes: Map<string, IHandler> = new Map()
  /** 根路由事件 */
  static rootRoute$ = new Subject<ActivatedRouteSnapshot>()
  static rootEnterRoute$ = new Subject<ActivatedRouteSnapshot>()
  static rootLeveaRoute$ = new Subject<ActivatedRouteSnapshot>()

  constructor(@Optional() @Inject(ROUTER_REUSE_CACHE_SIZE) private cacheSize: any) {
    cacheSize = cacheSize || 50
  }

  /** 路由是否复用, 如果true则直接复用当前组件, 不会触发下面的方法 */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
    if (future.routeConfig === future.root.routeConfig) {
      RouteReuseService.rootRoute$.next(future.root)
      RouteReuseService.rootEnterRoute$.next(future.root)
      RouteReuseService.rootLeveaRoute$.next(curr.root)
    }
    const isRouteConfigEqual = future.routeConfig === curr.routeConfig
    if (isRouteConfigEqual) {
      const multi = future.data?.multi
      return !multi
    } else {
      // FIXME: 这里是为了防止多个根路由组件直接的切换(全屏布局和侧边栏布局)的时候报错
      // Cannot reattach ActivatedRouteSnapshot created from a different route
      // Cannot reattach ActivatedRouteSnapshot with a different number of children
      // >>>>>> 防止报错
      const hander = RouteReuseService.handlers.get(curr.routeConfig)
      if (hander) {
        const { route: _route } = hander
        if (_route.value._routerState.snapshot.url !== (curr as any)._routerState.url) {
          RouteReuseService.handlers.delete(curr.routeConfig)
        }
      }
      // <<<<<<
      return false
    }
  }
  /** 获取对应的缓存数据 */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) return null
    const { data: { multi = false, noCache = false } = {} } = route.routeConfig
    if (noCache) {
      return null
    }
    if (!multi) {
      return RouteReuseService.handlers.get(route.routeConfig)
    } else {
      const _routerState = (route as any)._routerState
      const { url } = _routerState || {}
      return RouteReuseService.handlersWithParam.get(url)
    }
  }
  /** 路由是否分离, true分离才能存储缓存数据 */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (route?.data?.noCache) {
      return false
    }
    return !!route.component
  }
  /** 根据路由配置存储对应的缓存数据 */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (!handle) {
      return
    }
    // 如果组件已经销毁,则不在缓存
    if ((handle as any).componentRef?.changeDetectorRef?.destroyed) {
      return
    }
    /** 控制缓存数量 */
    if (RouteReuseService.handlers.size > this.cacheSize) {
      const deleteKey = [...RouteReuseService.handlers.keys()].shift()
      const urlRoute = [...RouteReuseService.urlRoutes.entries()].find(item => item[0] === deleteKey) || []
      const url = urlRoute[0]
      RouteReuseService.runNgOnDestroy(deleteKey)
      RouteReuseService.urlRoutes.delete(url)
    }
    if (RouteReuseService.handlersWithParam.size > this.cacheSize) {
      const deleteKey = [...RouteReuseService.handlersWithParam.keys()].shift()
      RouteReuseService.runNgOnDestroy(deleteKey)
    }
    // 存储缓存数据
    const { data: { multi } } = route
    if (!multi) {
      RouteReuseService.urlRoutes.set((route as any)._routerState.url, route.routeConfig)
      RouteReuseService.handlers.set(route.routeConfig, handle)
    } else {
      const _routerState = (route as any)._routerState
      const { url } = _routerState || {}
      RouteReuseService.handlersWithParam.set(url, handle)
    }
  }
  /** 是否将缓存恢复到对应的路由. 如果为true则需要执行retrieve, 和store方法(第二个参数将会是null) */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (route?.data?.noCache) {
      return false
    }
    if (!(route?.data?.multi)) {
      return !!RouteReuseService.handlers.has(route.routeConfig)
    } else {
      const _routerState = (route as any)._routerState
      const { url } = _routerState || {}
      return !!RouteReuseService.handlersWithParam.has(url)
    }
  }

  /** 通过route访问到对应到实例, 然后调用组件的销毁方法 */
  static runNgOnDestroy(route: Route | string) {
    if (!route) {
      return
    }
    let handler
    let componentRef
    if (typeof route === 'object') {
      // 删除handlers中的缓存
      handler = RouteReuseService.handlers.get(route) || {} as DetachedRouteHandle
      componentRef = handler.componentRef as ComponentRef<any>
    } else {
      // 多开模式, 删除handlers中的缓存
      handler = RouteReuseService.handlersWithParam.get(route) || {} as DetachedRouteHandle
      componentRef = handler.componentRef as ComponentRef<any>
    }
    if (componentRef && typeof componentRef.destroy === 'function') {
      // 销毁实例
      componentRef.destroy()
    }
    handler = null
    componentRef = null
    if (typeof route === 'object') {
      RouteReuseService.handlers.delete(route)
    } else {
      RouteReuseService.handlersWithParam.delete(route)
    }
  }

  /**
   * 此方法可以在router服务中通过路由复用的引用直接调用
   * @param url 需要关闭的url地址
   */
  deleteHandlerByUrl(url: string | string[]) {
    if (typeof url === 'string') {
      // 首先按照 url 去查找routeConfig, 如果找到了就不是多开模式
      const urlRoute = RouteReuseService.urlRoutes.get(url)
      if (typeof urlRoute === 'object') {
        RouteReuseService.runNgOnDestroy(urlRoute)
        RouteReuseService.urlRoutes.delete(url)

        // 可能是多开模式
      } else if (!urlRoute && typeof url === 'string') {
        RouteReuseService.runNgOnDestroy(url)
      }
    } else if (url instanceof Array) {
      url.forEach(item => {
        // 首先按照 url 去查找routeConfig, 如果找到了就不是多开模式
        const urlRoute = RouteReuseService.urlRoutes.get(item)
        if (typeof urlRoute === 'object') {
          RouteReuseService.runNgOnDestroy(urlRoute)
          RouteReuseService.urlRoutes.delete(item)

          // 可能是多开模式
        } else if (!urlRoute && typeof item === 'string') {
          RouteReuseService.runNgOnDestroy(item)
        }
      })
    }
  }

  /** 可以在任意组件的router.routeReuseStrategy.rootRoute, 此方法可以在任意组件监听从根组件开始的路由事件 */
  rootRoute(): Subject<ActivatedRouteSnapshot> {
    return RouteReuseService.rootRoute$
  }
  /** 进入路由事件 */
  rootEnterRoute(): Subject<ActivatedRouteSnapshot> {
    return RouteReuseService.rootEnterRoute$
  }
  /** 离开路由事件 */
  rootLeaveRoute(): Subject<ActivatedRouteSnapshot> {
    return RouteReuseService.rootLeveaRoute$
  }
}
