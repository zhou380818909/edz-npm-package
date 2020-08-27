import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  template: `
    <input />
    <button (click)="submit()">登录</button>
  `,
  styles: [``],
})
export class LoginComponent {
  constructor(private router: Router) {}

  submit() {
    this.router.navigateByUrl('/customer')
  }
}
