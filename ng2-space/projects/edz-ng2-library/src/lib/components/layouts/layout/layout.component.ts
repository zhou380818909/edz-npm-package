import { AfterViewInit, Component, Input } from '@angular/core'

@Component({
  selector: 'edz-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements AfterViewInit {
  @Input()
  isCollapsed = false

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
}
