import { Pipe, PipeTransform } from '@angular/core'

/** 时间管道, 将时间格式化为 2020/06/02 22:22:22, 解决Safari兼容性 */
@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: any): any {
    const date = /\d{4}.?\d{1,2}.?\d{1,2}.?\d{1,2}:\d{1,2}:\d{1,2}/g.exec(value)[0].replace(/[tT]/, ' ').replace(/-/g, '/')
    return date
  }
}
