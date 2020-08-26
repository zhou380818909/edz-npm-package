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

  constructor(private router: Router, private a: ActivatedRoute) {}

  ngOnDestroy() {
    console.log('用户详情组件销毁');
  }
}
