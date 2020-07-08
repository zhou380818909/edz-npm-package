import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output,
  SimpleChanges, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, Renderer2, OnDestroy } from '@angular/core'
import { Debounce } from 'lodash-decorators'
import { NzTableComponent, NzResizeObserver } from 'ng-zorro-antd'
import { debounceTime } from 'rxjs/operators'
import { Subscription } from 'rxjs'
import { ICheckedMap, IColumnItem, IPagination, ITableConfig, ITableItem, ITableScroll } from '../interfaces'

interface ICollapseItem extends IColumnItem {
  rowspan: number
  colspan: number
  isCheck?: boolean
}

@Component({
  selector: 'edz-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
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
  nzScroll: ITableScroll = null
  /** 表格列宽设置 */
  nzWidthConfig: string[] = []
  /** 表头合并设置 */
  collapseConfig: ICollapseItem[][] = []
  // 数据缓存
  private _data = []

  @ViewChild(NzTableComponent, { static: true })
  nzTable: NzTableComponent

  resizeSub: Subscription

  /** 是否是全部选中状态 */
  get isAllChecked() {
    return this.data.length > 0 && this.data.every(item => !item.disabled)
      ? this.data.filter(item => !item.disabled).every(item => this.checkedMap[item.id])
      : false
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

  constructor(
    private cdr: ChangeDetectorRef,
    private ele: ElementRef<HTMLElement>,
    private render: Renderer2,
    private resize: NzResizeObserver,
  ) {}

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
  setTableScroll() {
    if (this.config.scroll && this.ele.nativeElement) {
      this.render.setStyle(this.ele.nativeElement, 'overflow', 'hidden')
      // 监听元素的大小改变同时设定滚动区域
      this.resizeSub = this.resize.observe(this.ele.nativeElement).pipe(debounceTime(100)).subscribe(([...data]: ResizeObserverEntry[]) => {
        if (data[0]?.contentRect?.height) {
          // 表头高度
          const { clientHeight: theadHeight = 45 } = this.ele.nativeElement.querySelector('.ant-table-thead') || {}
          // 分页高度
          const { clientHeight: paginationHeight = 40 } = this.ele.nativeElement.querySelector('.ant-table-pagination.ant-pagination') || {}
          // 设置滚动高度
          this.nzScroll = { ...this.nzScroll, y: `${data[0].contentRect.height - theadHeight - paginationHeight}px` }
          this.cdr.detectChanges()
        }
      })
    }
  }

  // 提升表格渲染性能
  trackBy(index) {
    return index
  }

  /** 根据表格列配置和列宽配置生成表头分组 */
  createCollapses() {
    // TODO: 暂时没有实现表头分组
    // 判断列配置中是否含有表头合并相关皮配置
    const hasCallapse = this.column.some(item => item.colspan && item.colspan > 1)
    if (!hasCallapse) {
      // 如果没有表头合并, 则提取宽度配置
      this.nzWidthConfig = this.column.map(item => item.width)
      this.collapseConfig = [this.column.map(item => ({ colspan: 1, rowspan: 1, ...item }))]
      if (this.config.showCheck) {
        this.nzWidthConfig.unshift('48px')
        this.collapseConfig[0].unshift({ colspan: 1, rowspan: 1, isCheck: true, index: 'id' })
      }
    } else {
      // 如果有表头合并
      // 宽度配置为colspan不设置或者为1的宽度
      this.nzWidthConfig = this.column.filter(item => !item.colspan || item.colspan < 2).map(item => item.width)
      // const rowspanMax = Math.max(...this.column.filter(item => item.rowspan && item.rowspan > 1).map(item => item.rowspan))
      // 根据最大的行合并数生成合并配置的外层数量
      // this.collapseConfig = new Array(rowspanMax).fill([])
      console.warn('暂不支持表头分组')
    }
    this.cdr.detectChanges()
  }

  ngOnInit() {
    this.nzScroll = { ...this.nzScroll, x: this.config.width }
    this.setTableScroll()
    this.createCollapses()
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    // 将column里面的宽度width遍历到config的widthConfig中
    if (simpleChange.column && Array.isArray(simpleChange.column.currentValue)) {
      this.createCollapses()
    }
  }

  ngAfterViewInit() {
    // 表头滚动事件没有绑定上
    // setTimeout(() => {
    //   if (this.nzTable && typeof this.nzTable.ngAfterViewInit) {
    //     this.nzTable.ngAfterViewInit()
    //   }
    // }, 1000)
  }

  ngOnDestroy() {
    if (this.resizeSub) {
      this.resizeSub.unsubscribe()
    }
  }
}
