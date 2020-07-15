import { Component } from "@angular/core";

@Component({
  selector: 'app-user-info',
  template: `
  <p>
    <a routerLink="/user/list">list</a>
    <a routerLink="/user/detail/1">detail1</a>
    <a routerLink="/user/detail/2">detail2</a>
    <a routerLink="/user/info/eric">info-eric</a>
    <a routerLink="/user/info/chou">info-chou</a>
  </p>
    <p>
      info
      <input >
    </p>
  `,
})
export class UserInfoComponent {}
