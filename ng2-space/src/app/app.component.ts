/* eslint-disable no-console */
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { Component } from '@angular/core'
import { IColumnItem } from '../../projects/edz-ng2-library/src/lib/interfaces'

registerLocaleData(zh)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng2-space'
  text = '13211111111'
  options = [
    { key: 'id', value: '北京' },
  ]
  date=null
  showPhone() {
    setTimeout(() => {
      this.text = '13211112222'
    }, 1000)
  }
  onCollapse() {
    console.log(1)
    // alert(v)
  }
  onBtnClick() {
    console.log(this.date)
  }
  dateChange(date) {
    console.log(date)
  }
  column: IColumnItem[] = [
    {
      title: '明月',
      index: 'love',
      nzLeft: '0',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值',
      index: 'score',
    },
    {
      title: '颜值1',
      index: 'score',
    },
  ]
}
