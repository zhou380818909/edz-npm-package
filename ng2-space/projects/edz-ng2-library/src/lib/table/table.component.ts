import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { Debounce } from 'lodash-decorators'
import { NzTableComponent } from 'ng-zorro-antd'
import { ICheckedMap, IColumnItem, IPagination, ITableConfig, ITableItem, ITableScroll } from '../interfaces'

@Component({
  selector: 'edz-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent implements OnInit, AfterViewInit {
  /** 列配置 */
  @Input()
  column: IColumnItem[] = []
  /** 表格需要渲染的数据 */
  @Input()
  data: ITableItem[] = []
  /** 表格分页数据 */
  @Input()
  pagination: IPagination = { total: 10, pageIndex: 1, pageSize: 10 }
  /** 表格选中的id */
  @Input()
  checkedMap: ICheckedMap = {}
  @Input()
  loading = true
  /** 表格的配置 */
  @Input()
  config: ITableConfig = {
    nzPageSizeOptions: [10, 20, 50, 100],
  }

  /** 分页事件触发 */
  @Output()
  tableChange = new EventEmitter()
  @Output()
  checkChange = new EventEmitter()
  // 是否是webkit内核
  isWebKit = true
  /** 滚动区域 */
  scroll: ITableScroll = null
  // 数据缓存
  private _data = []

  @ViewChild(NzTableComponent, { static: true })
  nzTable: NzTableComponent

  /** 是否是全部选中状态 */
  get isAllChecked() {
    return this.data.length > 0 ? this.data.filter(item => !item.disabled).every(item => this.checkedMap[item.id]) : false
  }
  set isAllChecked(value) {}
  // 是否是半选中状态
  get isIndeterminate() {
    return this.data.filter(item => !item.disabled).some(item => this.checkedMap[item.id]) && !this.isAllChecked
  }
  /** 全选按钮禁用 */
  get allCheckDisabled() {
    return this._data.filter(item => !item.disabled).length < 1
  }

  constructor(private ele: ElementRef<HTMLElement>) {}

  /** 当页码和页大小同时改变的时候使用防抖 */
  @Debounce(10)
  paginationHanlder() {
    this.tableChange.emit()
  }
  /** 排序事件 */
  sortHanlder(event) {
    this.tableChange.emit(event)
  }

  /** 全选触发全选操作 */
  allCheckedHandler(value: boolean) {
    this.data.filter(item => !item.disabled).forEach(item => (this.checkedMap[item.id] = value))
    this.checkChange.next()
  }

  /** 每行选中触发的事件 */
  checkHanlder(checked, data: ITableItem) {
    this.checkedMap[data[this.config.checkIndex || 'id']] = checked
    this.checkChange.next({ data, checked })
  }

  /** 设置表格滚动 */
  setTableScrollY(y) {
    if (y) {
      this.scroll = { ...this.scroll, y }
    }
  }

  // 提升表格渲染性能
  trackBy(index) {
    return index
  }

  ngOnInit() {
    this.scroll = { ...this.scroll, x: this.config.width }
  }

  ngAfterViewInit() {
    // 表头滚动事件没有绑定上
    setTimeout(() => {
      if (this.nzTable && typeof this.nzTable.ngAfterViewInit) {
        this.nzTable.ngAfterViewInit()
      }
    }, 1000)
  }
}
