import { Component } from '@angular/core'

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
export class ScrollComponent {}
