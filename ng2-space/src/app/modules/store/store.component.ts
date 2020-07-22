/** eslint-disable max-len */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IInfoConfig, IInfoItem } from '../../../../projects/edz-ng2-library/src/public-api';

@Component({
  selector: 'store-list',
  templateUrl: './store.component.html',
})
export class StoreComponent implements OnInit {
  list: IInfoItem[] = []
  config: IInfoConfig = { nzSpan: { xxl: 6, xl: 8 }, labelStyle: { width: '74px' } }
  data = { name: '清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风', age: 24 }

  @ViewChild('render', { static: true })
  renderTpl: TemplateRef<any>

  ngOnInit() {
    this.list = [
      { label: '姓名', index: 'name', nzXXl: { span: 24 }, nzXl: { span: 24 }, nzEllipsis: true, labelStyle: { color: 'red', fontSize: '20px', width: '74px' }, valueStyle: { fontSize: '20px' } },
      { label: '年纪', index: 'age', nzXXl: { span: 12 }, nzXl: { span: 12 } },
      { label: '年纪多大', index: 'age', nzXXl: { span: 12 }, nzXl: { span: 12 } },
      { label: '年纪', index: 'age' },
      { label: '年纪', index: 'age', render: this.renderTpl },
      { label: '年纪', index: 'age' },
      { label: '年纪多大', index: 'age' },
      { label: '年纪', index: 'age' },
      { label: '年纪', index: 'age' },
      { label: '年纪', index: 'age', tips: '2123213' },
    ]
  }
}
