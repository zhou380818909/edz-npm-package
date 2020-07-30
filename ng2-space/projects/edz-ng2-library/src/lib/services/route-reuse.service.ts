/*
 * @Author: ChouEric
 * @Date: 2019-12-08 10:41:31
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-07-30 14:34:48
 * @Description: 路由复用策略
 * // TODO: 未完成路由通配符
 */
import { ComponentRef } from '@angular/core'
import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy } from '@angular/router'
import { Subject } from 'rxjs'

/**
 * 返回一个路由复用的类
 * @param handlerSize 路由复用的缓存数量, 默认是20
 */
export const RouteReuseServiceFactory = (handlerSize = 20) => (
  class RouteReuseService implements RouteReuseStrategy {
    /** 缓存数据 */
    static handlers: Map<Route, any > = new Map()
    /** url地址和路由配置的映射, 主要是用于对外通过url来查找到对应路由配置 */
    static urlRoutes: Map<string, Route> = new Map()
    /** 根路由事件 */
    static rootRoute$ = new Subject<ActivatedRouteSnapshot>()
    static rootEnterRoute$ = new Subject<ActivatedRouteSnapshot>()
    static rootLeveaRoute$ = new Subject<ActivatedRouteSnapshot>()

    /** 路由是否复用, 如果true则直接复用当前组件, 不会触发下面的方法 */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
      if (future.routeConfig === future.root.routeConfig) {
        RouteReuseService.rootRoute$.next(future.root)
        RouteReuseService.rootEnterRoute$.next(future.root)
        RouteReuseService.rootLeveaRoute$.next(curr.root)
      }
      return future.routeConfig === curr.routeConfig
    }
    /** 获取对应的缓存数据 */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
      return RouteReuseService.handlers.get(route.routeConfig)
    }
    /** 路由是否分离, true分离才能存储缓存数据 */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
      return !!route.component
    }
    /** 根据路由配置存储对应的缓存数据 */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
      if (!handle) {
        return
      }
      /** 控制缓存数量 */
      if (RouteReuseService.handlers.size > handlerSize) {
        const deleteKey = [...RouteReuseService.handlers.keys()].shift()
        const urlRoute = [...RouteReuseService.urlRoutes.entries()].find(item => item[0] === deleteKey) || []
        const url = urlRoute[0]
        RouteReuseService.runNgOnDestroy(deleteKey)
        RouteReuseService.urlRoutes.delete(url)
      }
      RouteReuseService.urlRoutes.set((route as any)._routerState.url, route.routeConfig)
      RouteReuseService.handlers.set(route.routeConfig, handle)
    }
    /** 是否将缓存恢复到对应的路由. 如果为true则需要执行retrieve, 和store方法(第二个参数将会是null) */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
      return !!RouteReuseService.handlers.has(route.routeConfig)
    }

    /** 通过route访问到对应到实例, 然后调用组件的销毁方法 */
    static runNgOnDestroy(route: Route) {
      if (!route) {
        return
      }
      // 删除handlers中的缓存
      const handler = RouteReuseService.handlers.get(route) || {} as DetachedRouteHandle
      const componentRef = handler.componentRef as ComponentRef<any>
      if (componentRef && componentRef.instance && componentRef.instance.ngOnDestroy) {
        // 销毁实例
        componentRef.destroy()
      }
      RouteReuseService.handlers.delete(route)
    }

    /**
     * 此方法可以在router服务中通过路由复用的引用直接调用
     * @param url 需要关闭的url地址
     */
    deleteHandlerByUrl(url: string | string[]) {
      if (typeof url === 'string') {
        const urlRoute = RouteReuseService.urlRoutes.get(url) || {}
        RouteReuseService.runNgOnDestroy(urlRoute)
        RouteReuseService.urlRoutes.delete(url)
      } else if (url instanceof Array) {
        url.forEach(item => {
          const urlRoute = RouteReuseService.urlRoutes.get(item) || {}
          RouteReuseService.runNgOnDestroy(urlRoute)
          RouteReuseService.urlRoutes.delete(item)
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
)
