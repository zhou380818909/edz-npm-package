import { Directive, ElementRef, Renderer2 } from '@angular/core'

@Directive({
  selector: '[edz-scroll-content]',
  exportAs: 'edzScrollContent',
})
export class ScrollContentDirective {
  constructor(private ele: ElementRef<HTMLDivElement>, private render: Renderer2) {
  }

  ngAfterViewInit() {
    if (this.ele && this.ele.nativeElement) {
      this.render.setStyle(this.ele.nativeElement, 'flex', '1')
      this.render.setStyle(this.ele.nativeElement, 'overflow', 'auto')
    }
  }
}
