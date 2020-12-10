import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'edz-bool-text',
  templateUrl: './bool-text.component.html',
  styleUrls: ['./bool-text.component.scss'],
})
export class BoolTextComponent implements OnInit {
  @Input()
  condition: boolean
  @Input()
  text: string
  @Input()
  isChangeColor: boolean = false

  showText: string
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.text === '是否') {
      this.showText = this.condition ? '是' : '否'
    } else {
      this.showText = (this.condition ? '已' : '未') + this.text
    }
    if (this.isChangeColor) {
      this.condition = !this.condition
    }
  }
}
