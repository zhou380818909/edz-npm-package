import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  ComponentFactoryResolver, ElementRef, EventEmitter, Input,
  isDevMode, OnDestroy, OnInit, Output,
  QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren, ViewContainerRef,
} from '@angular/core'
import { NzResizeObserver } from 'ng-zorro-antd/core/resize-observers'
import { NzTableComponent } from 'ng-zorro-antd/table'
import { Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { ICheckedMap, IColumnItem, IPagination, ITableConfig, ITableItem, ITableScroll } from '../../interfaces'
import { TableService } from './table.service'

interface IRenderColumnItem extends IColumnItem {
  nzLeftWidth?: string | boolean
  nzRightWidth?: string | boolean
}

interface ICollapseItem extends IRenderColumnItem {
  rowspan?: number
  colspan?: number
}

@Component({
  selector: 'edz-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableService],
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
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
  loading = false
  /** 表格的配置 */
  @Input()
  config: ITableConfig = {}

  /** 分页事件触发 */
  @Output()
  tableChange = new EventEmitter()
  @Output()
  checkChange = new EventEmitter()
  // 是否是webkit内核
  isWebKit = true
  /** 滚动区域 */
  nzScroll: ITableScroll = null
  /** 表格需要渲染的列 */
  renderColumn: IRenderColumnItem[] = []
  /** 渲染的配置 */
  renderConfig: ITableConfig = {
    nzPageSizeOptions: [10, 20, 50, 100],
    scroll: true,
    nzBordered: true,
    nzHideOnSinglePage: false,
    rowHeight: 24,
  }
  /** 表格列宽设置 */
  nzWidthConfig: string[] = []
  /** 表头合并设置 */
  collapseConfig: ICollapseItem[][] = []
  // 数据缓存
  private _data = []
  private measureWidth

  get totalData() {
    if (this.config && Array.isArray(this.config.totalData)) {
      const rowHeight = this.config.rowHeight + 9 || 33
      return this.config.totalData.map((item, index, arr) => ({
        ...item,
        stickyBottom: (arr.length - index - 1) * rowHeight,
      }
      ))
    }
    if (this.config && typeof this.config.totalData === 'object') {
      return [{ ...this.config.totalData, stickyBottom: 0 }]
    }
    return []
  }

  @ViewChild(NzTableComponent, { static: true })
  nzTable: NzTableComponent

  @ViewChildren('componentContainer', { read: ViewContainerRef })
  components: QueryList<ViewContainerRef>

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
    private service: TableService,
    private cfr: ComponentFactoryResolver,
  ) {}

  /** 当页码和页大小同时改变的时候使用防抖 */
  // @Debounce(10)
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
  checkHanlder(checked, data: ITableItem, col: IRenderColumnItem) {
    this.checkedMap[data[col.index || 'id']] = checked
    this.checkChange.next({ data, checked })
  }

  /** 设置表格滚动, 并且监听滚动 */
  setTableScroll() {
    if (this.renderConfig?.scroll && this.ele.nativeElement) {
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
          // 执行脏值检测
          this.cdr.detectChanges()
        }
      })
    }
  }

  // 提升表格循环渲染性能, 目前用索引, 如果为了实现排序则会需要为的index.
  trackBy(index) {
    return index
  }

  /** 根据component渲染数据 */
  componentRender() {
    if (!this.components) return
    const cols = this.column.filter(col => col.component)
    // 视图容器是由行到列
    this.data.forEach((row, index) => {
      cols.forEach((col, number) => {
        const container = this.components.toArray()[index * cols.length + number]
        if (!container) return
        container.clear()
        const componentFactory = this.cfr.resolveComponentFactory(col.component)
        const componentRef = container.createComponent(componentFactory)
        const param = col.componentParam ? col.componentParam(row) : row
        Object.assign(componentRef.instance, param)
      })
    })
  }

  /** 根据宽度自动计算所需要的定位的宽度 */
  private setNzLeftOrRightWidth([...column]: IRenderColumnItem[], isRight = false): IRenderColumnItem[] {
    if (isRight) {
      column = column.reverse()
    }
    return column.reduce((pre, cur, index) => {
      let nzLeftWidth: boolean | string
      let nzRightWidth: boolean | string
      if (index === 0) {
        nzLeftWidth = cur.nzLeft
        nzRightWidth = cur.nzRight
      } else {
        nzLeftWidth = cur.nzLeft ? `${parseInt(pre[index - 1].width, 10)
          + parseInt(pre[index - 1].nzLeftWidth === true ? 0 : pre[index - 1].nzLeftWidth, 10)}px` : false
        nzRightWidth = cur.nzRight ? `${parseInt(pre[index - 1].width, 10)
          + parseInt(pre[index - 1].nzRightWidth === true ? 0 : pre[index - 1].nzRightWidth, 10)}px` : false
      }
      pre.push({ ...cur, nzLeftWidth, nzRightWidth })
      return pre
    }, [])
  }

  /** 根据表格列配置和列宽配置生成表头分组 */
  createCollapses() {
    // 取消脏值检测
    this.cdr.detach()
    // TODO: 暂时没有实现表头分组
    // 判断列配置中是否含有表头合并相关配置
    const hasCallapse = this.column.some(item => item.rowspan > 1 || item.colspan > 1)
    this.renderColumn = [...this.column].filter(item => item.colspan === 1 || !item.colspan)
    // 已经可以自动实现左右固定了
    // const collapseConfigLeft = this.setNzLeftOrRightWidth(this.renderColumn)
    // const collapseConfigRight = this.setNzLeftOrRightWidth(this.renderColumn, true).reverse()
    // this.renderColumn = collapseConfigLeft.map((item, index) => ({
    //   ...item,
    //   nzRightWidth: collapseConfigRight[index].nzRightWidth,
    // }))
    if (!hasCallapse) {
      // 如果没有表头合并, 则提取宽度配置
      this.nzWidthConfig = this.renderColumn.map(item => `${item.width}px`)
      this.collapseConfig = [this.renderColumn.map(item => ({ ...item, colspan: 1, rowspan: 1 }))]
    } else {
      // 如果有表头合并
      // 宽度配置为colspan不设置或者为1的宽度
      this.nzWidthConfig = this.column.filter(item => !item.colspan || item.colspan < 2).map(item => (item.width
        ? `${item.width}px` : '0px'))
      this.collapseConfig = this.service.collapseColumn(this.column)
      // const rowspanMax = Math.max(...this.column.filter(item => item.rowspan && item.rowspan > 1).map(item => item.rowspan))
      // 根据最大的行合并数生成合并配置的外层数量
      // this.collapseConfig = new Array(rowspanMax).fill([])
      // console.warn('暂不支持表头分组')
    }
    // 执行脏值检测
    this.cdr.detectChanges()
    // 重新绑定脏值检测, 必须绑定, 不然组件不再有交互效果
    this.cdr.reattach()
  }

  ngOnInit() {
    this.nzScroll = { ...this.nzScroll, x: `${this.renderConfig?.width || 0}px` }
    this.setTableScroll()
    this.cdr.detectChanges()
    const measureWidth = this.nzTable.listOfAutoColWidth.reduce((pre, cur) => {
      pre += parseInt(cur, 10) ? parseInt(cur, 10) : 0
      return pre
    }, 0)
    const configWidth = this.renderConfig?.width ? this.renderConfig?.width : 0
    if (measureWidth > configWidth) {
      Object.assign(this.nzScroll, { x: `${measureWidth + 160}px` })
      if (isDevMode) {
        this.measureWidth = measureWidth
        if (this.renderConfig.scroll) {
          console.warn(`表格config宽度${configWidth}小于column累加总宽度${measureWidth}, 已自动设置为${measureWidth + 160}`)
        }
      }
    }
  }

  ngOnChanges(simpleChange: SimpleChanges) {
    // 将column里面的宽度width遍历到config的widthConfig中
    if (simpleChange.column && Array.isArray(simpleChange.column.currentValue)) {
      this.createCollapses()
      if (this.data?.length > 0) {
        this.componentRender()
      }
    }
    if (simpleChange.data && Array.isArray(simpleChange.data.currentValue)) {
      this.componentRender()
    }
    if (simpleChange.config.currentValue) {
      Object.assign(this.renderConfig, simpleChange.config.currentValue)
    }
  }

  ngOnDestroy() {
    if (this.resizeSub && typeof this.resizeSub.unsubscribe === 'function') {
      this.resizeSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    Promise.resolve().then(() => {
      if (!this.renderConfig.scroll && this.measureWidth > this.ele?.nativeElement?.clientWidth) {
        console.error(`表格宽度${this.ele?.nativeElement?.clientWidth || 0}小于column累加总宽度${this.measureWidth}, 最后一列布局出现错误`)
      }
    })
  }
}
