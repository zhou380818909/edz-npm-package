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
      title: '姓名',
      index: 'name',
      nzLeft: '0',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名',
      index: 'score',
    },
    {
      title: '姓名1',
      index: 'score',
    },
  ]
}
