import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-auth-detail',
  templateUrl: './auth-detail.component.html',
  styleUrls: ['./auth-detail.component.scss'],
})
export class AuthDetailComponent implements OnInit {
  imageList = [
    'http://placekitten.com/1500/900',
    'http://placekitten.com/1500/3000',
    'http://placekitten.com/1500/902',
    'http://placekitten.com/1500/903',
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
