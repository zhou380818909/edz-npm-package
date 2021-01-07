import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core'
import { ActivationStart, NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadStart, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { LayoutLoadingGuard } from '../layout-loading-guard.guard'

@Component({
  selector: 'edz-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  isCollapsed = false
  @Input()
  footerTitle: string | TemplateRef<any> = null

  isString
  siderTransition = false
  loading = false

  private routerStart$: Subscription
  private routerEnd$: Subscription

  constructor(private router: Router, private guard: LayoutLoadingGuard) {
    this.guard.loading$.pipe().subscribe(value => this.loading = value)
    this.routerStart$ = router.events.pipe(
      filter(event => event instanceof ActivationStart || event instanceof RouteConfigLoadStart),
    ).subscribe(() => {
      this.loading = true
    })
    this.routerEnd$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError),
    )
      .subscribe(event => {
        this.loading = false
        if (event instanceof NavigationCancel || event instanceof NavigationError) {
          console.error('当前导航出错', event)
        }
      })
  }

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

  ngOnDestroy() {
    this.routerStart$.unsubscribe()
    this.routerEnd$.unsubscribe()
  }
}
