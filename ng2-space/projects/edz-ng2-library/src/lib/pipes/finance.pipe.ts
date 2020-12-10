import { Pipe, PipeTransform } from '@angular/core'

/** 千分数字管道 */
@Pipe({
  name: 'finance',
})
export class FinancePipe implements PipeTransform {
  constructor() {}

  transform(value: any) {
    if (Number.isNaN(value)) {
      return '-'
    }
    // 利用正则千分数字
    return (value as number).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
  }
}
