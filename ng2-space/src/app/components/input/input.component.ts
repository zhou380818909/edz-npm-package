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
  value = ''

  constructor() { }

  ngModelChange(value) {
    this.change(value)
  }

  ngOnInit(): void {
  }
}
