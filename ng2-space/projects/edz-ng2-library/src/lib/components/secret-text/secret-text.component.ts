import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'edz-secret-text',
  templateUrl: './secret-text.component.html',
  styleUrls: ['./secret-text.component.scss'],
})
export class SecretTextComponent implements OnInit {
  constructor() { }
  @Input() defualtText: string
  @Input() text: string
  @Output() onClick = new EventEmitter<string>()

  isShow = false

  ngOnInit() {

  }

  show() {
    this.isShow = true
    this.onClick.emit(this.text)
  }
}
