import { Directive, ElementRef, Input, Renderer2 } from '@angular/core'

@Directive({
  selector: '[edz-scroll]',
  exportAs: 'edzScroll',
})
export class ScrollDirective {
  @Input()
  edzScroll: 'row' | 'column' = 'column'

  constructor(private ele: ElementRef<HTMLDivElement>, private render: Renderer2) {
  }

  ngAfterViewInit() {
    if (this.ele && this.ele.nativeElement) {
      this.render.setStyle(this.ele.nativeElement, 'display', 'flex')
      this.render.setStyle(this.ele.nativeElement, 'height', '100%')
      this.render.setStyle(this.ele.nativeElement, 'width', '100%')
      // if (this.edzScroll === 'column') {
      //   this.render.setStyle(this.ele.nativeElement, 'overflow-x', 'hidden')
      // } else {
      //   this.render.setStyle(this.ele.nativeElement, 'overflow-y', 'hideen')
      // }
      this.render.setStyle(this.ele.nativeElement, 'flex-direction', this.edzScroll)
    }
  }
}
