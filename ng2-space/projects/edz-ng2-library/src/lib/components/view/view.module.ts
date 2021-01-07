/*
 * @Author: ChouEric
 * @Date: 2021-01-07 11:11:02
 * @Last Modified by: ChouEric
 * @Last Modified time: 2021-01-07 11:12:19
 * @Description: 此组件不再需要, ng-zorro组件库提供 Image 组件, https://ng.ant.design/components/image/zh
 */
import { OverlayModule } from '@angular/cdk/overlay'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ViewComponent } from './view.component'
import { ViewDirective } from './view.directive'

@NgModule({
  declarations: [ViewComponent, ViewDirective],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [ViewDirective],
})
export class ViewModule {
  constructor() {
    console.warn('此组件不再需要, ng-zorro组件库提供 Image 组件, https://ng.ant.design/components/image/zh')
  }
}
