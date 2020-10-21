import { Directive, ElementRef, Renderer2 } from '@angular/core'

@Directive({
  selector: '[edz-scroll]',
  exportAs: 'edzScroll',
})
export class ScrollDirective {
  constructor(private ele: ElementRef<HTMLDivElement>, private render: Renderer2) {
  }

  ngAfterViewInit() {
    if (this.ele && this.ele.nativeElement) {
      this.render.setStyle(this.ele.nativeElement, 'display', 'flex')
      this.render.setStyle(this.ele.nativeElement, 'height', '100%')
      this.render.setStyle(this.ele.nativeElement, 'flex-direction', 'column')
    }
  }
}
