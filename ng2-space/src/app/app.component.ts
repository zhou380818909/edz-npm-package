/* eslint-disable no-console */
import { registerLocaleData } from '@angular/common'
import zh from '@angular/common/locales/zh'
import { Component, OnInit } from '@angular/core'

registerLocaleData(zh)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
