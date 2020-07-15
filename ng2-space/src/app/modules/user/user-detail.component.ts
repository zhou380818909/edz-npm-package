import { Component, OnDestroy } from "@angular/core";

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
  ngOnDestroy() {
    console.log(1);
    
  }
}
