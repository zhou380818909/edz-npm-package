/*
 * @Author: ChouEric
 * @Date: 2020-08-07 17:35:19
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-08-07 19:05:40
 * @Description: 感谢珊哥提供方法解决表头分组的实现
 */
import { Injectable } from '@angular/core'

@Injectable()
export class TableService {
  matrixMul = [[]]
  findAddress(rowspan, colspan) {
    let pointerX = 0
    let pointerY = 0
    const mLen = this.matrixMul.length
    let mcLen = 0
    let isAddress = false
    let isnCanAdd = false
    for (let i = 0; i < mLen; i++) {
      mcLen = this.matrixMul[i].length
      for (let j = 0; j < mcLen; j++) {
        if (!this.matrixMul[i][j]) {
          // 先判断向下   再判断向右
          if (mcLen - j >= rowspan) { // 满足向下
            if (mLen - i >= colspan) { // 满足列数
              // 得看看本列右边 上边是否为空   为空则需要另外起行
              if (j === 0) {
                pointerX = i
                pointerY = j
                isAddress = true
              } else {
                isnCanAdd = false
                for (let k = 1; k < colspan; k++) {
                  if (!this.matrixMul[i + k][j - 1]) {
                    isnCanAdd = true
                  }
                }
                if (!isnCanAdd) {
                  pointerX = i
                  pointerY = j
                  isAddress = true
                }
              }
            } else { //

            }
          } else { // 向右边

          }
        }

        if (isAddress) {
          break
        }
      }
      if (isAddress) {
        break
      }
    }
    if (!isAddress) {
      pointerX = mLen
    }
    return {
      pointerX,
      pointerY,
    }
  }
  fillMu() {
    const mLen = this.matrixMul.length
    for (let i = 0; i < mLen; i++) {
      for (let j = 0; j < this.matrixMul[0].length; j++) {
        if (!this.matrixMul[i][j]) {
          this.matrixMul[i][j] = ''
        }
      }
    }
  }
  judgeMu(rowspan, colspan, title, ci) {
    const mLen = this.matrixMul.length
    let resDir = 0
    // var arr = JSON.parse(JSON.stringify(this.matrixMul))
    if (mLen <= colspan || this.matrixMul[0].length < rowspan) { // 先比整个列数    新加的列超出整个表的列
      if (this.matrixMul[0].length < rowspan) {
        for (let i = 0; i < mLen; i++) {
          for (let j = 0; j < rowspan; j++) {
            if (!this.matrixMul[i] || !this.matrixMul[i].length) {
              this.matrixMul[i] = []
            }
            this.matrixMul[i][j] = this.matrixMul[i][j] || ''
          }
        }
      }

      if (ci) { //
        for (let i = 0; i < colspan; i++) {
          for (let j = 0; j < rowspan; j++) {
            if (!this.matrixMul[mLen + i] || !this.matrixMul[mLen + i].length) {
              this.matrixMul[mLen + i] = []
            }
            this.matrixMul[mLen + i][j] = title // 这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
          }
        }
      } else {
        for (let i = 0; i < colspan; i++) {
          for (let j = 0; j < rowspan; j++) {
            if (!this.matrixMul[mLen + i - 1] || !this.matrixMul[mLen + i - 1].length) {
              this.matrixMul[mLen + i - 1] = []
            }
            this.matrixMul[mLen + i - 1][j] = title // 这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
          }
        }
      }
      this.fillMu()
      resDir = 0
    } else { // 小于整列  整行
      const address = this.findAddress(rowspan, colspan)
      const { pointerX } = address
      const { pointerY } = address

      for (let i = 0; i < colspan; i++) {
        for (let j = 0; j < rowspan; j++) {
          // this.matrixMul[i][j] = this.matrixMul[i][j] || ''
          if (!this.matrixMul[i + pointerX] || !this.matrixMul[i + pointerX].length) {
            this.matrixMul[i + pointerX] = []
          }
          this.matrixMul[i + pointerX][pointerY + j] = title
        }
      }
      this.fillMu()
      resDir = pointerY
    }
    return resDir
  }
  dealColumn(column) {
    const len = column.length
    let colIdx = 0
    this.preDealMatri(column)
    for (let ci = 0; ci < len; ci++) { // 一维长度为i,i为变量，可以根据实际情况改变
      colIdx = this.judgeMu(column[ci].rowspan || 1, column[ci].colspan || 1, column[ci].title, ci)
      column[ci].colIdx = colIdx
    }
  }
  preDealMatri(column) {
    let rowNum = 0
    let colNum = 0
    const len = column.length
    for (let ci = 0; ci < len; ci++) { // 一维长度为i,i为变量，可以根据实际情况改变
      if (rowNum < (column[ci].rowspan || 1)) {
        rowNum = column[ci].rowspan || 1
      }
      if (colNum < (column[ci].colspan || 1)) {
        colNum = column[ci].colspan || 1
      }
    }
    for (let i = 0; i < colNum; i++) {
      this.matrixMul[i] = []
      for (let j = 0; j < rowNum; j++) {
        this.matrixMul[i][j] = '' // 这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
      }
    }
  }
  /** 根据column */
  getCollapse(column) {
    this.dealColumn(column)
    column.sort((a, b) => a.colIdx - b.colIdx)
    const len = column.length
    const resArr = []
    let idx = 0
    for (let i = 0; i < len; i++) {
      idx = column[i].colIdx
      if (!resArr[idx] || !resArr[idx].length) {
        resArr[idx] = []
      }
      resArr[idx].push(column[i])
    }
    return resArr
  }
}
