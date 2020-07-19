import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core'

@Directive({
  selector: '[appShowButton]',
})
export class ShowButtonDirective implements OnInit {
  @Input('appShowButton')
  buttonIndex: string

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) {}

  ngOnInit() {
    if (this.buttonIndex) {
      this.viewContainer.createEmbeddedView(this.template)
    } else {
      this.viewContainer.clear()
    }
  }
}
