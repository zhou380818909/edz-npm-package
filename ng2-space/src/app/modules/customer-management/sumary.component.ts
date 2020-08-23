import { Component, Input } from "@angular/core";

@Component({
  selector: 'summary',
  template: `<div>hello {{name}}</div>`,
  styles: ['']
})
export class Summary {
  @Input()
  name = '1111'
}
