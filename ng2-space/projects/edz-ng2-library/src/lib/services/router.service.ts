/*
 * @Author: ChouEric
 * @Date: 2020-08-26 23:44:07
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-08-26 23:49:06
 * @Description: 此文件应该只会在tab组件中用到, 在路由组件中可以通过 activatedRoute 的 pathFromRoot 属性获取
 */
import { Injectable } from '@angular/core'
import { PRIMARY_OUTLET, Router } from '@angular/router'
import { Route } from '../interfaces'

@Injectable({ providedIn: 'root' })
export class RouterService {
  constructor(private router: Router) {}

  /** 将url(含参数的)地址转换为纯path的地址 */
  getPathFromUrl(url: string) {
    return this.router.parseUrl(url).root.children[PRIMARY_OUTLET].segments.map(item => item.path).reduce((pre, cur) => {
      pre += cur ? `/${cur}` : ''
      return pre
    }, '')
  }

  /** 将url(含参数的)地址转为纯path数组 */
  getPathArrayFromUrl(url: string) {
    return this.router.parseUrl(url).root.children[PRIMARY_OUTLET].segments.map(item => item.path)
  }

  /** 根据url获取路由配置的当前匹配路由的最后一级路由配置 */
  getLastRouteConfigFromRouteConfig(route: Route | Route[], routeArray: string[]): Route {
    if (Array.isArray(route)) {
      const routes = [...routeArray]
      let matched = true
      let targetRoute = route.find(item => item.path === routeArray[0] || item.path.startsWith(':'))
      if (!targetRoute) {
        targetRoute = route.find(item => item.path === '')
        matched = false
      }
      if (matched) {
        routes.shift()
        return this.getLastRouteConfigFromRouteConfig(targetRoute, routes)
      }
      return this.getLastRouteConfigFromRouteConfig(targetRoute, routeArray)
    }
    // 同步的路由配置
    if (route.children && route.children.length > 0) {
      const routes = [...routeArray]
      let matched = true
      let targetRoute = route.children.find(item => item.path === routeArray[0] || item.path.startsWith(':'))
      if (!targetRoute) {
        targetRoute = route.children.find(item => item.path === '')
        matched = false
      }
      if (matched) {
        routes.shift()
        return this.getLastRouteConfigFromRouteConfig(targetRoute, routes)
      }
      return this.getLastRouteConfigFromRouteConfig(targetRoute, routeArray)
    }
    // 异步的路由配置
    if (Array.isArray((route as any)?._loadedConfig?.routes) && (route as any)?._loadedConfig?.routes.length > 0) {
      const routes = [...routeArray]
      let matched = true
      // eslint-disable-next-line max-len
      let targetRoute = (route as any)?._loadedConfig?.routes.find((item: { path: string }) => item.path === routeArray[0] || item.path.startsWith(':'))
      if (!targetRoute) {
        targetRoute = (route as any)?._loadedConfig?.routes.find((item: { path: string }) => item.path === '')
        matched = false
      }
      if (matched) {
        routes.shift()
        return this.getLastRouteConfigFromRouteConfig(targetRoute, routes)
      }
      return this.getLastRouteConfigFromRouteConfig(targetRoute, routeArray)
    }
    return route
  }

  /** 根据url获取当前匹配路由的逐级路由配置 */
  // eslint-disable-next-line max-len
  getDeepRouteConfigFromRouteConfig(route: Route| Route[], routeArray: string[], preConfigArray: Route[] = Array.isArray(route) ? [] : [route]): Route[] {
    if (Array.isArray(route)) {
      const routes = [...routeArray]
      let matched = true
      let targetRoute = route.find(item => item.path === routeArray[0] || item.path.startsWith(':'))
      if (!targetRoute) {
        targetRoute = route.find(item => item.path === '')
        matched = false
      }
      if (matched) {
        routes.shift()
        return this.getDeepRouteConfigFromRouteConfig(targetRoute, routes, [...preConfigArray, targetRoute])
      }
      return this.getDeepRouteConfigFromRouteConfig(targetRoute, routeArray, [...preConfigArray, targetRoute])
    }
    if (route.children && route.children.length > 0) {
      const routes = [...routeArray]
      let matched = true
      let targetRoute = route.children.find(item => item.path === routeArray[0] || item.path.startsWith(':'))
      if (!targetRoute) {
        targetRoute = route.children.find(item => item.path === '')
        matched = false
      }
      if (matched) {
        routes.shift()
        return this.getDeepRouteConfigFromRouteConfig(targetRoute, routes, [...preConfigArray, targetRoute])
      }
      return this.getDeepRouteConfigFromRouteConfig(targetRoute, routeArray, [...preConfigArray, targetRoute])
    }
    if (Array.isArray((route as any)?._loadedConfig?.routes) && (route as any)?._loadedConfig?.routes.length > 0) {
      const routes = [...routeArray]
      let matched = true
      // eslint-disable-next-line max-len
      let targetRoute = (route as any)?._loadedConfig?.routes.find((item: { path: string }) => item.path === routeArray[0] || item.path.startsWith(':'))
      if (!targetRoute) {
        targetRoute = (route as any)?._loadedConfig?.routes.find((item: { path: string }) => item.path === '')
        matched = false
      }
      if (matched) {
        routes.shift()
        return this.getDeepRouteConfigFromRouteConfig(targetRoute, routes, [...preConfigArray, targetRoute])
      }
      return this.getDeepRouteConfigFromRouteConfig(targetRoute, routeArray, [...preConfigArray, targetRoute])
    }
    return preConfigArray
  }
}
