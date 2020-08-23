import { Component, Input } from "@angular/core";

@Component({
  selector: 'info',
  template: `<div>word {{score}}</div>`,
  styles: ['']
})
export class Info {
  @Input()
  score = '1111'
}
