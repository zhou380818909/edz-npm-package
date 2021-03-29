import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input()
  change: (str: string) => void
  @Input()
  model = ''
  @Input()
  type = 'default'

  constructor() { }

  ngOnInit(): void {
  }
}
