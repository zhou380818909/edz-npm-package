import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core'

@Component({
  selector: 'edz-scroll',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host { display: flex; flex: 1; flex-direction: column; overflow: auto; }
    edz-scroll-content: { flex: 1; overflow: auto; }
  `],
})
export class ScrollComponent implements AfterViewInit {
  constructor(private ele: ElementRef<HTMLDivElement>, private render: Renderer2) {
  }

  ngAfterViewInit() {
    if (this.ele && this.ele.nativeElement && this.ele.nativeElement.parentElement) {
      this.render.setStyle(this.ele.nativeElement.parentElement, 'display', 'flex')
      this.render.setStyle(this.ele.nativeElement.parentElement, 'height', '100%')
      this.render.setStyle(this.ele.nativeElement.parentElement, 'overflow', 'auto')
      this.render.setStyle(this.ele.nativeElement.parentElement, 'flex-direction', 'column')
    }
  }
}
