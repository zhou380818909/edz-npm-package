import { Component } from "@angular/core";
import { TabService } from "../../../../projects/edz-ng2-library/src/lib/tab/tab-service.service";

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
      <button nz-button nzType="primary" (click)="clickHandler()">关闭当前</button>
      <input >
    </p>
  `,
})
export class UserInfoComponent {
  constructor(private tabServcie: TabService) {}

  clickHandler() {
    this.tabServcie.close$.next()
  }

}
