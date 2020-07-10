import { Component } from '@angular/core'

@Component({
  selector: 'edz-scroll-content',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    ':host { flex: 1; overflow: auto }',
  ],
})
export class ScrollContentComponent {}
