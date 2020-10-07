import {
  Component, ComponentFactoryResolver, Input, OnChanges,
  QueryList, SimpleChanges, ViewChildren, ViewContainerRef,
} from '@angular/core'
import { assign } from 'lodash'
import { IInfoConfig, IInfoItem } from '../../interfaces'

@Component({
  selector: 'edz-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnChanges {
  @Input()
  list: IInfoItem[] = []
  @Input()
  data = {}
  @Input()
  config = {}

  configRender: IInfoConfig = { nzGutter: [0, 8], nzSpan: { xl: 8, xxl: 6 } }
  private defaultConfig: IInfoConfig = { nzGutter: [0, 8], nzSpan: { xl: 8, xxl: 6 }, labelStyle: { width: '60px' } }

  @ViewChildren('componentContainer', { read: ViewContainerRef })
  components: QueryList<ViewContainerRef>

  constructor(private cfr: ComponentFactoryResolver) {}

  /** 根据component渲染数据 */
  componentRender() {
    if (!this.components) return
    this.list.forEach((item, index) => {
      const container = this.components.toArray()[index]
      if (!container) return
      container.clear()
      const componentFactory = this.cfr.resolveComponentFactory(item.component)
      const componentRef = container.createComponent(componentFactory)
      const param = item.componentParam ? item.componentParam(this.data) : this.data
      Object.assign(componentRef.instance, param)
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config && changes.config.currentValue && typeof changes.config.currentValue === 'object') {
      this.configRender = assign(this.defaultConfig, changes.config.currentValue)
    }
    if (changes.list && Array.isArray(changes.list.currentValue)) {
      if (this.data) {
        this.componentRender()
      }
    }
    if (changes.data && Array.isArray(changes.data.currentValue)) {
      if (Array.isArray(this.list) && this.list.length > 0) {
        this.componentRender()
      }
    }
  }
}
