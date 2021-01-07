/*
 * @Author: ChouEric
 * @Date: 2020-07-15 15:05:59
 * @Last Modified by: ChouEric
 * @Last Modified time: 2021-01-07 19:30:11
 * @Description: 封装 http 请求
 */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { cloneDeep, isEmpty, isNil } from 'lodash-es'
import { NzMessageService } from 'ng-zorro-antd/message'
import { stringify } from 'qs'
import { EMPTY, Observable, of, Subject } from 'rxjs'
import { catchError, switchMap, throttleTime } from 'rxjs/operators'
import { XOR } from '../interfaces'

interface IMap {
  data: string
  code: string
  message: string
}

export interface IHttpServiceConfig {
  /** code, data, message的映射关系 */
  map?: IMap,
  /** 返回成功的状态码 */
  successCode?: number,
  /** 是否使用后端返回的错误信息 */
  useBackEndErrorMessage?: boolean
  /** 是否携带cookie */
  withCredentials?: boolean
  /** 未登录回调 */
  unAuthCallback?: () => void
}

/** 基本请求参数 */
interface IBaseHttpParam {
  /** 查询参数, ?a=1&b=2 */
  query?: Record<string, string> | [string, string][]
  /** 路径参数, /a/b */
  path?: string[]
}

interface IFormHttpParam extends IBaseHttpParam {
  /** json数据 contentType: application/x-www-form-urlencoded  */
  form?: Record<string, string>

}
interface IJsonHttpParam extends IBaseHttpParam {
  /** 表单数据 contentType: application/json */
  json?: Record<string, string>
}
/** 带请求体的请求参数 */
type IBodyHttpParam = XOR<IFormHttpParam, IJsonHttpParam>

/** 后端返回的数据 */
interface IResponse<T = any> {
  code: number
  data: T
  message: string
}

interface IPostOption {
  /** 是否显示错误 */
  showError?: boolean
  /** 请求结束的回调函数 */
  callback?: (errorMessage?: string) => void
  /** 返回数据是否response */
  observe?: 'response'
  /** 不设置请求头, 此配置用于配合请求拦截器使用 */
  noHeader?: boolean
  /** 是否携带cookie */
  withCredentials?: boolean
}

interface IGetOption extends IPostOption {
  /** 是否缓存当前数据 */
  cache?: boolean
  /** 是否不使用缓存, 请求接口并且将新数据应用于缓存 */
  fresh?: boolean
}

/** 请求服务配置令牌 */
export const HTTP_SERVICE_CONFIG = new InjectionToken<IHttpServiceConfig>('HTTP_SERVICE_CONFIG')

/** 请求服务, 注意: 此服务依赖ng-zorro-antd的NzMessageService服务, 所以需要在根模块引入NzMessageModule模块 */
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /** 字段-成功状态 */
  private code: string
  /** 字段-成功数据 */
  private data: string
  /** 字段-成功消息 */
  private message: string
  /** 成功状态码 */
  private successCode: number
  /** 是否携带cookie */
  private withCredentials = true
  /** 是否使用后端返回的错误消息 */
  private useBackEndErrorMessage: boolean
  /** 未登录 */
  private unAuth$ = new Subject<{ message: string, notShowErrorMessagee: boolean }>()
  /** 提示队列, 相同提示不用再提示 */
  errorMessageQueque = new Set<string>()
  /** 缓存数据 */
  private static cache = {}
  constructor(
    private http: HttpClient,
    private messageService: NzMessageService,
    private activatedRoute: ActivatedRoute,
    // 将配置文件通过服务商令牌注入
    @Optional()
    @Inject(HTTP_SERVICE_CONFIG) private config: IHttpServiceConfig,
  ) {
    // 解构配置文件
    const {
      map: { code = 'code', data = 'data', message = 'message' } = { },
      successCode = 0,
      useBackEndErrorMessage = true,
      withCredentials = true,
      unAuthCallback,
    } = config || {} as IHttpServiceConfig
    this.code = code
    this.data = data
    this.message = message
    this.successCode = successCode
    this.useBackEndErrorMessage = useBackEndErrorMessage
    this.withCredentials = withCredentials
    this.unAuth$.pipe(throttleTime(600)).subscribe(({ message: msg, notShowErrorMessagee }) => {
      if (notShowErrorMessagee) {
        if (typeof unAuthCallback === 'function') {
          unAuthCallback()
        }
      } else {
        messageService.remove()
        if (!this.errorMessageQueque.has(msg)) {
          this.errorMessageQueque.add(msg)
          messageService.error(msg, { nzDuration: 2000 }).onClose.subscribe(() => {
            this.errorMessageQueque.delete(msg)
          })
        }
      }
    })
  }

  /**
   * 封装get请求, 查询参数为对象
   * @param url 请求地址
   * @param params 请求参数
   * @param option  请求配置, 默认: 显示错误showError=true, 没有请求头noHeader=true, 不缓存数据, 不刷新
   */
  get<T = any>(
    url: string,
    { query = {} as any, path = [] } = {} as IBaseHttpParam,
    { showError = true, cache = false, fresh = false, noHeader = false,
      callback = () => {}, observe, withCredentials = this.withCredentials } = {} as IGetOption,
  ): Observable<T | never> {
    // 拼接路径参数
    if (path instanceof Array) {
      url = path.reduce((pre, cur) => `${pre}/${cur}`, url)
    }
    query = this.deleteEmptyParams(query)
    query = this.trimParams(query)
    // 拼接查询参数
    url = stringify(query) ? `${url}?${stringify(query)}` : url
    // 实现已经缓存的数据并且不需要刷新,从缓存取值
    if (HttpService.cache[url] && !fresh) {
      return of(HttpService.cache[url])
    }
    const headers = noHeader ? new HttpHeaders().set('No-Auth', 'TRUE').set('cache-control', 'no-cache')
      : new HttpHeaders().set('cache-control', 'no-cache')
    return this.http
      .get(`${url}`, {
        withCredentials,
        headers,
      })
      .pipe(
        switchMap((res: any) => {
          if (observe === 'response') {
            callback()
            return of(res)
          }
          if (res && res[this.code] === this.successCode) {
            // 部分接口缓存数据, 以url作为唯一标识符, 以cache字段作为是否缓存的参数
            if (cache || fresh) {
              // 采用lodash的cloneDeep
              // FIXME: 同样这里可以采用 ngxs 库来统一管理缓存
              const cacheData = observe !== 'response' ? cloneDeep(res.data) : cloneDeep(res)
              if (!isEmpty(cacheData)) {
                // FIXME: 同样这里可以采用 ngxs 库来统一管理缓存
                HttpService.cache[url] = cacheData
              }
            }
            callback()
            return of(res[this.data])
          }
          callback(res[this.message])
          return this.errorHandler(res[this.message] || res || '请求失败 ,请重试!', !showError)
        }),
        catchError((error: any) => {
          callback(error)
          return this.errorHandler(error, !showError)
        }),
      ) as Observable<T>
  }

  /**
   * 封装post请求, 简化参数写法
   * @param url 请求地址
   * @param params 请求参数
   * @param option 请求配置, 默认: 显示错误showError=true, 没有请求头noHeader=true
   */
  post<T = any>(url: string, param?: IBodyHttpParam, option?: IPostOption): Observable<T | never> {
    return this.bodyRequest<T>(url, param, option, 'post')
  }

  /**
   * 封装put请求, 简化参数写法
   * @param url 请求地址
   * @param params 请求参数
   * @param option 请求配置, 默认: 显示错误showError=true, 没有请求头noHeader=true
   */
  put<T = any>(url: string, param?: IBodyHttpParam, option?: IPostOption): Observable<T | never> {
    return this.bodyRequest<T>(url, param, option, 'put')
  }

  /**
   * 封装delete请求, 查询参数为对象, 路径参数为数组
   * @param url 请求地址
   * @param params 请求参数
   * @param option 请求配置, 默认: 显示错误showError=true, 没有请求头noHeader=true
   */
  delete<T = any>(
    url,
    { query = {}, path = [] } = {} as IBaseHttpParam,
    { showError = true, noHeader = false, callback = () => {}, observe, withCredentials = this.withCredentials } = {} as IPostOption,
  ): Observable<T | never> {
    // 拼接路径参数
    if (path instanceof Array) {
      url = path.reduce((pre, cur) => `${pre}/${cur}`, url)
    }
    query = this.deleteEmptyParams(query)
    query = this.trimParams(query)
    const headers = noHeader ? new HttpHeaders().set('No-Auth', 'TRUE') : new HttpHeaders().set('cache-control', 'no-cache')
    return this.http
      .delete<IResponse<T>>(`${url}`, {
      params: query as any,
      withCredentials,
      headers,
    })
      .pipe(
        switchMap(res => {
          if (observe === 'response') {
            callback()
            return of(res)
          }
          if (res && res[this.code] === this.successCode) {
            callback()
            return of(res[this.data])
          }
          callback(res[this.message])
          return this.errorHandler(res[this.message] || res || '请求失败 ,请重试!', !showError)
        }),
        catchError((error: any) => {
          callback(error)
          return this.errorHandler(error, !showError)
        }),
      ) as Observable<T>
  }

  /** 请求体请求, 主要指put和post */
  private bodyRequest<T>(
    url: string,
    { form = {}, json = {}, query = {}, path = [] } = {} as any,
    { showError = true, noHeader = false, withCredentials = this.withCredentials, callback = () => {}, observe } = {} as IPostOption,
    method = 'post',
  ) {
    // 拼接路径参数
    if (path instanceof Array) {
      url = path.reduce((pre, cur) => `${pre}/${cur}`, url)
    }
    const hasQuery = !isEmpty(query)
    const hasForm = !isEmpty(form)
    const hasJson = !isEmpty(json)

    query = this.deleteEmptyParams(query)
    query = this.trimParams(query)
    let param = null
    let headers = noHeader ? new HttpHeaders().set('No-Auth', 'TRUE') : null
    if (hasForm) {
      form = this.trimParams(form)
      param = stringify(form as any)
      headers = noHeader
        ? new HttpHeaders().set('No-Auth', 'TRUE').set('content-type', 'application/x-www-form-urlencoded;charset=utf-8')
        : new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded;charset=utf-8')
    }
    if (hasJson) {
      json = this.trimParams(json)
      param = json
    }
    return this.http[method]<IResponse<T>>(`${url}${hasQuery ? `?${stringify(query as any)}` : ''}`, param, {
      headers,
      withCredentials,
    }).pipe(
      // 根据返回结果转换
      switchMap((res: IResponse) => {
        if (observe === 'response') {
          callback()
          return of(res)
        }
        if (res && res[this.code] === this.successCode) {
          callback()
          return of(res[this.data])
        }
        callback(res[this.message])
        return this.errorHandler(res[this.message] || res || '请求失败, 请重试!', !showError)
      }),
      // 如果失败则处理失败
      catchError((error: any) => {
        callback(error)
        return this.errorHandler(error, !showError)
      }),
    ) as Observable<T>
  }

  /**
   * 格式换文字长度, 如果40个字符以内原文返回, 如果超过40个将返回40个字符和...
   * @param text
   * @returns 格式话之后的文字
   */
  private formatText(text: string) {
    return text.replace(/(.{0,40})?(.*)/s, (s, p1, p2) => p1 + (p2 ? '...' : ''))
  }

  /** 显示错误 */
  private error(text: string) {
    if (!this.errorMessageQueque.has(text)) {
      this.errorMessageQueque.add(text)
      this.messageService.error(text).onClose.subscribe(() => {
        this.errorMessageQueque.delete(text)
      })
    }
  }

  /** 处理错误 */
  private errorHandler(error: any, notShowErrorMessagee): Observable<never> {
    if (notShowErrorMessagee && (error && error.status !== 200)) {
      return EMPTY
    }
    if (typeof error === 'string') {
      this.error(this.useBackEndErrorMessage ? this.formatText(error) : '未知错误，请与研发中心技术客服联系！')
      return EMPTY
    }
    if (error && error.status) {
      const { status, error: errorData } = error as HttpErrorResponse
      const { text } = errorData || {}
      // 此处出现错误一般是返回的非JSON数据, JSON.parse()调用失败, 认为返回的是未登录的情况
      if (status <= 200) {
        // 如果返回的是包含 html 关键字的文本, 则认为是重定向到了登录页
        if (/<html/i.test(text)) {
          this.unAuth$.next({ message: '登录失效, 请重新登录!', notShowErrorMessagee })
          return EMPTY
        }
        let message = ''
        // 匹配后端弹出alert('***')中的字符串
        const match = /alert\(['"'](.*)['"']\)/.exec(text)
        if (match) {
          message = match[match.length - 1]
        } else {
          message = '未知错误，请与研发中心技术客服联系！'
        }
        message = this.formatText(message)
        this.unAuth$.next({ message, notShowErrorMessagee })
        return EMPTY
      }
      if (status < 400) {
        this.error('服务端处理异常，请与研发中心技术客服联系！')
        return EMPTY
      }
      if (status === 404) {
        this.error('请求地址不存在，请与研发中心技术客服联系！')
        return EMPTY
      }
      if (status < 500) {
        this.error('请求参数错误，请检查后重试！')
        return EMPTY
      }
      if (status >= 500) {
        this.error('服务端处理异常，请与研发中心技术客服联系！')
        return EMPTY
      }
    }
    this.error('未知错误，请与研发中心技术客服联系！')
    return EMPTY
  }

  /** 去除参数的前后空格 */
  private trimParams(params) {
    if (!(params instanceof Object)) {
      return {}
    }
    const isArray = Array.isArray(params)
    const param = isArray ? [...params] : { ...params }
    if (isArray) {
      return param.map(item => {
        if (typeof item === 'string') {
          return item.trim()
        }
        return item
      })
    }
    Object.keys(param).forEach(key => {
      if (typeof param[key] === 'string') {
        param[key] = param[key].trim()
      }
    })
    return param
  }

  /** 删除空字符串参数 */
  private deleteEmptyParams(query) {
    if (!(query instanceof Object)) {
      return {}
    }
    // 删除空字段
    Object.keys(query).forEach(key => {
      if (isNil(query[key] || query[key] === '')) {
        delete query[key]
      }
    })
    return query
  }
}
