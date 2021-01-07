/*
 * @Author: ChouEric
 * @Date: 2021-01-07 11:11:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2021-01-07 11:12:44
 * @Description: 此组件不再需要,也并未完善, ng-zorro组件库提供 Image 组件, https://ng.ant.design/components/image/zh
 */
import { Overlay, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { AfterViewInit, ComponentRef, Directive, ElementRef, Renderer2 } from '@angular/core'
import { fromEvent } from 'rxjs'
import { ViewComponent } from './view.component'

@Directive({
  selector: '[edzView]',
})
export class ViewDirective implements AfterViewInit {
  private componentRef: ComponentRef<ViewComponent>
  private overlayRef: OverlayRef
  private imageList = []

  constructor(private ele: ElementRef<HTMLUListElement>, private overlay: Overlay, private render: Renderer2) {}

  createView(e: MouseEvent) {
    this.overlayRef = this.overlay.create({
      // hasBackdrop: true,
      // backdropClass: 'ant-modal-mask',
    })
    const portal = new ComponentPortal(ViewComponent)
    this.componentRef = this.overlayRef.attach(portal)
    this.render.setStyle(this.overlayRef.overlayElement, 'width', '100%')
    this.render.setStyle(this.overlayRef.overlayElement, 'height', '100%')
    this.componentRef.instance.close$.subscribe(() => {
      this.destroyView()
    })
    const current = this.imageList.findIndex(item => item === (e.target as HTMLImageElement).src)
    Object.assign(this.componentRef.instance, { list: this.imageList, current })
  }

  destroyView() {
    this.overlayRef.dispose()
  }

  ngAfterViewInit() {
    this.ele.nativeElement.childNodes.forEach(item => {
      if (item instanceof HTMLLIElement) {
        const image = (item.childNodes as NodeListOf<HTMLImageElement>).item(0)
        if (image instanceof HTMLImageElement) {
          this.imageList.push(image.src)
        }
      }
    })
    fromEvent(this.ele.nativeElement, 'click').subscribe((e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.target instanceof HTMLImageElement) {
        this.createView(e)
      }
    })
  }
}
