import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'edz-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  isCollapsed = false
  @Output()
  collapse = new EventEmitter()

  constructor() { }

  collapseHandler() {
    this.isCollapsed = !this.isCollapsed
    this.collapse.emit(this.isCollapsed)
  }

  ngOnInit(): void {
  }
}
