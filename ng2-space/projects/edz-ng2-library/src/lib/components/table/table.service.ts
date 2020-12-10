/* eslint-disable no-else-return */
/*
 * @Author: ChouEric
 * @Date: 2020-08-07 17:35:19
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-10-07 16:23:46
 * @Description: 目前有bug, 首列如果是行合并, 并且超过两行, 会出现问题
 */
import { Injectable } from '@angular/core'
import { IColumnItem } from '../../interfaces'

@Injectable({ providedIn: 'root' })
export class TableService {
  /** 表头分组 */
  collapseColumn(columns: IColumnItem[]): IColumnItem[][] {
    const result = []
    function push(index, target) {
      result[index] = result[index] || []
      result[index].push(target)
    }
    columns.reduce((pre, cur, index) => {
      const { x, y } = pre
      const { colspan, rowspan } = cur
      // 需要重新确定大块
      if (x === 0 || y === 0) {
        // 如果colspan=1, 则就是一列, 则直接推入
        if (colspan === 1) {
          push(0, cur)
          // arr[0].push(cur)
          return { w: 0, h: 0, x: 0, y: 0 }

        // 如果rowspan=1, 则大块的大小就是 w=cur.colspan, h =
        } else if (rowspan === 1) {
          pre.w = colspan
          pre.h = columns[index + 1].rowspan + 1
          pre.x = pre.w
          pre.y = pre.h
          push(pre.h - pre.y, cur)
          pre.y = pre.h - 1
          return pre
        }
        console.error('表格配置错误, 不能生成')
        return pre

      // 列等于1,
      } else if (colspan === 1) {
        // arr[pre.h - pre.y].push(cur)
        push(pre.h - pre.y, cur)
        pre.x -= 1
        return pre
      } else if (rowspan === 1) {
        push(pre.h - pre.y, cur)
        pre.y -= 1
        return pre
      }
      console.error('表格配置错误, 不能生成')
      return pre
    }, { w: 0, h: 0, x: 0, y: 0 })
    return result
  }
}
