/* eslint-disable no-else-return */
/*
 * @Author: ChouEric
 * @Date: 2020-08-07 17:35:19
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-12-14 15:18:39
 * @Description: 完成合并表头功能. 待完善 选择列功能
 */
import { Injectable } from '@angular/core'
import { IColumnItem } from '../../interfaces'

interface ICollapseItem extends IColumnItem {
  rowspan: number
  colspan: number
  parent?: ICollapseItem[]
  children: ICollapseItem[]
}
interface IColumnItemWithRoot extends IColumnItem {
  /** 父节到最终节点的数组 */
  parentToRoot?: IColumnItemWithRoot[]
  children?: IColumnItemWithRoot[]
}

@Injectable({ providedIn: 'root' })
export class TableService {
  /** 返回一个数据, 将数据包装成带有 parentToRoot 的数据, 纯函数 */
  addParentToRoot(column: IColumnItem[] | IColumnItem): IColumnItemWithRoot[] {
    if (Array.isArray(column)) {
      return column.map(item => {
        const target = { ...item }
        if (Array.isArray(item.children) && item.children.length > 0) {
          target.children = this.addParentToRoot(item)
        }
        return target
      })
    } else if (Array.isArray(column.children)) {
      return column.children.map(item => {
        const target = { ...item } as IColumnItemWithRoot
        target.parentToRoot = (column as IColumnItemWithRoot).parentToRoot ? [...(column as IColumnItemWithRoot).parentToRoot] : []
        const parent = { ...column }
        Reflect.deleteProperty(parent, 'children')
        target.parentToRoot.push(parent)
        if (Array.isArray(item.children) && item.children.length > 0) {
          const sub = { ...item, parentToRoot: [...target.parentToRoot] }
          target.children = this.addParentToRoot(sub)
        }
        return target
      })
    }
    // 此处代码不会执行
    return []
  }
  /** 根据 parentToRoot 字段, 返回数据的最大层级, 纯函数 */
  getMaxLevel(column: IColumnItemWithRoot[] | IColumnItemWithRoot, maxLevel = 1) {
    if (Array.isArray(column)) {
      column.forEach(item => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          const itemMaxLevel = this.getMaxLevel(item, maxLevel)
          maxLevel = maxLevel > itemMaxLevel ? maxLevel : itemMaxLevel
        }
      })
      return maxLevel
    } else if (Array.isArray(column.children)) {
      column.children.forEach(item => {
        if (Array.isArray(item.parentToRoot)) {
          const itemMaxLevel = item.parentToRoot.length + 1
          maxLevel = maxLevel > itemMaxLevel ? maxLevel : itemMaxLevel
        }
        if (Array.isArray(item.children) && item.children.length > 0) {
          const itemMaxLevel = this.getMaxLevel(item, maxLevel)
          maxLevel = maxLevel > itemMaxLevel ? maxLevel : itemMaxLevel
        }
      })
      return maxLevel
    }
    // 此处代码不会执行
    return 1
  }

  getColspan(column: IColumnItemWithRoot): number {
    return column.children.map(item => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        return this.getColspan(item)
      } else {
        return 1
      }
    }).reduce((pre, cur) => pre += cur)
  }

  /** 表头分组, 非纯函数 */
  collapseColumn(columns: IColumnItemWithRoot[]): ICollapseItem[][] {
    const results = new Array(this.getMaxLevel(columns)).fill(null).map(() => [])
    columns.forEach(item => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        const result = { ...item } as ICollapseItem
        result.rowspan = 1
        result.colspan = this.getColspan(item)
        const resultIndex = item.parentToRoot?.length || 0
        Reflect.deleteProperty(result, 'children')
        results[resultIndex].push(result)
        this.collapseColumnChildren(item.children, results)
      } else {
        const result = { ...item } as ICollapseItem
        result.colspan = 1
        const resultIndex = item.parentToRoot?.length || 0
        result.rowspan = results.length - resultIndex
        results[resultIndex].push(result)
      }
    })
    return results
  }

  collapseColumnChildren(columns: IColumnItemWithRoot[], results: ICollapseItem[][]) {
    columns.forEach(item => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        const result = { ...item } as ICollapseItem
        result.rowspan = 1
        result.colspan = this.getColspan(item)
        const resultIndex = item.parentToRoot?.length || 0
        Reflect.deleteProperty(result, 'children')
        results[resultIndex].push(result)
        this.collapseColumnChildren(item.children, results)
      } else {
        const result = { ...item } as ICollapseItem
        result.colspan = 1
        const resultIndex = item.parentToRoot?.length || 0
        result.rowspan = results.length - resultIndex
        results[resultIndex].push(result)
      }
    })
  }

  getWidthConfig(columns: IColumnItemWithRoot[]): string[] {
    const results = []
    columns.forEach(item => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        this.getWidthConfigChildren(item.children, results)
      } else {
        results.push(item.width ? `${item.width}px` : '')
      }
    })
    return results
  }

  getWidthConfigChildren(columns: IColumnItemWithRoot[], results: string[]) {
    columns.forEach(item => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        this.getWidthConfigChildren(item.children, results)
      } else {
        results.push(item.width ? `${item.width}px` : '')
      }
    })
  }

  getRenderColumn(columns: IColumnItemWithRoot[]): IColumnItem[] {
    const results = []
    columns.forEach(item => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        this.getRenderColumnChildren(item.children, results)
      } else {
        const result = { ...item }
        Reflect.deleteProperty(result, 'parentToRoot')
        results.push(result)
      }
    })
    return results
  }

  getRenderColumnChildren(columns: IColumnItemWithRoot[], results: ICollapseItem[][]) {
    columns.forEach(item => {
      if (Array.isArray(item.children) && item.children.length > 0) {
        this.getRenderColumnChildren(item.children, results)
      } else {
        const result = { ...item } as any
        Reflect.deleteProperty(result, 'parentToRoot')
        results.push(result)
      }
    })
  }
}
