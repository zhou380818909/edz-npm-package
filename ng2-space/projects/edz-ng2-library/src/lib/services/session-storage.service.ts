/*
 * @Author: ChouEric
 * @Date: 2019-11-18 15:12:40
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-10-22 15:04:43
 * @Description: 浏览器的本地存储
 */
import { Injectable } from '@angular/core'
import { isNil } from 'lodash-es'

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly sessionStorage
  private readonly sessionName = 'SESSION_SERVICE'

  constructor() {
    if (window && window.sessionStorage) {
      const sessionJSONString = window.sessionStorage.getItem(this.sessionName)
      try {
        if (sessionJSONString) {
          this.sessionStorage = JSON.parse(sessionJSONString)
        } else {
          this.sessionStorage = {}
          window.sessionStorage.setItem(this.sessionName, '{}')
        }
      } catch (error) {
        this.sessionStorage = {}
        window.sessionStorage.setItem(this.sessionName, '{}')
      }
    }
  }

  /** 获取整个数据 */
  get() {
    return this.sessionStorage
  }

  /**
   * 从sessionStorage中读取数据, 读取为内存的数据
   * @param key path 键名 userinfo.username
   */
  getItem(path: string) {
    const keyArr = path.split('.')
    let target = this.sessionStorage
    let errorPath = ''
    while (keyArr.length) {
      const currentKey = keyArr.shift()
      target = target[currentKey]
      errorPath += `${currentKey}.`
      if (keyArr.length >= 1 && typeof target !== 'object') {
        console.error(`路径数据访问出错: ${errorPath}为${target}`)
        return null
      }
    }
    return target
  }

  /**
   * 设置sessionStorage中的数据, 改变内存中的数据和浏览器缓存的数据
   * @param path 键名 userinfo.username
   * @param value 值
   */
  setItem(path: string, value: any) {
    try {
      const keyArr = path.split('.')
      keyArr.reduce((pre, cur, index, arr) => {
        if (index >= arr.length - 1) {
          pre[cur] = value
          return
        }
        if (isNil(pre[cur])) {
          pre[cur] = {}
          // eslint-disable-next-line consistent-return
          return pre[cur]
        }
        if (typeof pre[cur] === 'object') {
          // eslint-disable-next-line consistent-return
          return pre[cur]
        }
        throw new Error('当前路径上存在非对象数据')
      }, this.sessionStorage)
      if (window && window.sessionStorage) {
        window.sessionStorage.setItem(this.sessionName, JSON.stringify(this.sessionStorage))
      }
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * 删除sessionStorage中的数据
   * @param path 键名 userinfo.username
   */
  removeItem(path: string) {
    const keyArr = path.split('.')
    let target = this.sessionStorage
    while (keyArr.length) {
      if (keyArr.length <= 1) {
        delete target[keyArr.shift()]
        break
      }
      target = target[keyArr.shift()]
      if (!target) {
        target = {}
      }
    }
    if (window && window.sessionStorage) {
      window.sessionStorage.setItem(this.sessionName, JSON.stringify(this.sessionStorage))
    }
  }
}
