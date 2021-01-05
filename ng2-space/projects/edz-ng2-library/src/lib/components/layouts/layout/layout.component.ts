import { AfterViewInit, Component, Input, OnInit, TemplateRef } from '@angular/core'

@Component({
  selector: 'edz-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @Input()
  isCollapsed = false
  @Input()
  footerTitle: string | TemplateRef<any> = null

  isString

  siderTransition = false

  constructor() { }

  /** 在当前元素视图初始化,并且当前动画停止后再次可以执行宽度改变的动画 */
  ngAfterViewInit(): void {
    if (typeof window.requestAnimationFrame === 'function') {
      requestAnimationFrame(() => {
        this.siderTransition = true
      })
    }
  }

  ngOnInit() {
    this.isString = typeof this.footerTitle === 'string'
  }
}
