import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'edz-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent implements OnInit {
  @Input() siderMinWidth?:number = 73
  @Input() siderMaxWidth?:number = 200
  @Output() onCollapse = new EventEmitter<boolean>()

  isCollapsed = false
  siderStyle = {}

  constructor() {
  }

  setSiderMax() {
    this.siderStyle = {
      flex: `0 0 ${this.siderMaxWidth}px`,
      'max-width': `${this.siderMaxWidth}px`,
      'min-width': `${this.siderMaxWidth}px`,
      width: `${this.siderMaxWidth}px`,
      overflow: 'hidden',
    }
  }

  setSiderMin() {
    this.siderStyle = {
      flex: `0 0 ${this.siderMinWidth}px`,
      'max-width': `${this.siderMinWidth}px`,
      'min-width': `${this.siderMinWidth}px`,
      width: `${this.siderMinWidth}px`,
      overflow: 'hidden',
    }
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed
    if (this.isCollapsed) {
      this.setSiderMin()
    } else {
      this.setSiderMax()
    }
    this.onCollapse.next(this.isCollapsed)
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.setSiderMax()
  }
}
