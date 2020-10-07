import { Pipe, PipeTransform } from '@angular/core'
import { format } from 'date-fns'

/** 时间管道, 将时间格式化为 2020/06/02 22:22:22, 解决Safari兼容性 */
@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: any, [arg]): any {
    const date = /\d{4}.?\d{1,2}.?\d{1,2}.?\d{1,2}:\d{1,2}:\d{1,2}/g.exec(value)[0].replace(/[tT]/, ' ').replace(/-/g, '/')
    if (arg) {
      return format(new Date(date), arg)
    }
    return date
  }
}
