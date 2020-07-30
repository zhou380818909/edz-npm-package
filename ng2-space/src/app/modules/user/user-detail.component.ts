import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-user-detail',
  template: `
  <p>
      <a routerLink="/user/list">list</a>
      <a routerLink="/user/detail/1">detail1</a>
      <a routerLink="/user/detail/2">detail2</a>
      <a routerLink="/user/info/eric">info-eric</a>
      <a routerLink="/user/info/chou">info-chou</a>
  </p>
    <p>
      detail
      <input>
    </p>
  `,
})
export class UserDetailComponent implements OnDestroy {
  rootRoute$: Subscription
  rootEnterRoute$: Subscription
  rootLeaveRoute$: Subscription
  private url: null

  constructor(private router: Router, private a: ActivatedRoute) {
    // 如果路由复用策略中存在函数
    if (typeof (this.router.routeReuseStrategy as any).rootRoute === 'function') {
      this.rootEnterRoute$ = (this.router.routeReuseStrategy as any).rootEnterRoute().subscribe((route: any) => {
        this.url = route._routerState.url
        console.log(route._routerState.url, this.a.snapshot.params);
      })
      this.rootLeaveRoute$ = (this.router.routeReuseStrategy as any).rootLeaveRoute().subscribe((route: any) => {
        // if (this.url === route._routerState.url) {
        //   this.url === route.
        // }
        console.log(route._routerState.url, this.a.snapshot.params);
      })
    }
  }

  ngOnDestroy() {
    console.log(1);
  }
}
