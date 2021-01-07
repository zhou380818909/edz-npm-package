/*
 * @Author: ChouEric
 * @Date: 2021-01-07 11:11:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2021-01-07 11:12:19
 * @Description: 此组件不再需要, ng-zorro组件库提供 Image 组件, https://ng.ant.design/components/image/zh
 */
import { Component, ElementRef, Input, OnInit } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  selector: 'edz-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  @Input()
  list: string[] = []
  @Input()
  current: string | number

  close$ = new Subject()

  constructor(private ele: ElementRef) {
  }

  closeHandler() {
    this.close$.next()
  }

  ngOnInit(): void {
  }
}
