import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { assign } from 'lodash'
import { IInfoConfig, IInfoItem } from '../interfaces'

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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.config && changes.config.currentValue && typeof changes.config.currentValue === 'object') {
      this.configRender = assign(this.defaultConfig, changes.config.currentValue)
    }
  }
}
