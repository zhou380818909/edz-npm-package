import { TemplateRef, EventEmitter } from '@angular/core'
import { NzMenuItemDirective } from 'ng-zorro-antd'
import { Observable } from 'rxjs'

/** 表格的转换数据 */
export interface ITransfer {
  [index: string]:
  | {
    target: string
    color?: 'danger' | 'secondary' | 'warning' | ''
  }
  | string
}

export interface IPipe {
  pipe: 'number' | 'date'
  /** 管道参数(0.2-2, yyyy-MM-dd HH:mm:ss) */
  format: string
}

/** 表格列 */
export interface IColumnItem<T = { [k: string]: any }> {
  /** 数据对应的字段名 */
  index: keyof T
  /** 表格列名 */
  title?: string
  /** 列标题的渲染 */
  titleRender?: TemplateRef<any>
  /** 数据组件渲染 */
  render?: TemplateRef<any>
  /** 数据渲染格式映射 */
  transfer?: ITransfer
  /** 管道 */
  pipe?: IPipe
  /** 是否排序 */
  nzShowSort?: boolean
  /** 排序名 */
  nzSortOrder?: 'descend' | 'ascend' | null
  /** 排序的回调 */
  nzSortOrderChange?: (sort: 'descend' | 'ascend' | null, column: IColumnItem[], index: number) => void
  /** 列宽, 如果超过宽度将自动缩略 */
  width?: string
  /** 行合并 */
  rowspan?: number
  /** 列合并 */
  colspan?: number
  /** 鼠标悬浮提示 */
  tooltip?: boolean
  /** 鼠标悬浮提示组件渲染 */
  tooltipTpl?: TemplateRef<any>
  /** 行高, 当设置列宽的时候, 可能出现表格对不齐的问题, 需要设置行高 */
  lineHeight?: number
  /** webkit设置多行省略 */
  lineClamp?: number
  /** 列宽固定左侧, 不要和左边的选择框同时使用 */
  nzLeft?: boolean
  /** 列表固定右侧 */
  nzRight?: boolean
}
/** 表格数据 */
export interface ITableItem {
  [index: string]: any
  /** 数据控制样式 */
  style?: object
}
/** 表格分页 */
export interface IPagination {
  /** 分页总数 */
  total: number
  /** 分页大小 */
  pageSize: number
  /** 当前页码 */
  pageIndex: number
}
/** 表格选中的数据的ID或者其他唯一标识符 */
export interface ICheckedMap {
  [id: number]: boolean
  [id: string]: boolean
}
/** 表格的配置 */
export interface ITableConfig {
  /** 表格总宽度, 出现横向滚动条 */
  width?: string
  /** 是否显示边框 */
  nzBordered?: boolean
  /** 是否有选择框 */
  showCheck?: boolean
  /** 选中的定位 */
  checkNzLeft?: boolean
  /** 选中数据的唯一标识符 */
  checkIndex?: string
  /** 分页大小范围 */
  nzPageSizeOptions?: number[]
  /** 单页是否隐藏分页 */
  nzHideOnSinglePage?: boolean
  /** 是否固定表格内容, false为不固定 */
  scroll?: boolean
}

/** 表格滚动区域 */
export interface ITableScroll {
  x: string
  y: string
}

/** 菜单配置 */
export interface IMenuItem {
  /** 菜单名 */
  title: string
  /** 菜单跳转的地址 */
  path: string
  /** 菜单内置图标 */
  icon?: string
  /** iconfont图标 */
  iconfont?: string
  /** 自定义图标地址 */
  iconUrl?: string
  /** 子菜单 */
  children?: IMenuItem[]
  /** 是否隐藏 */
  hidden?: boolean
}

export interface IMenuConfig {
  /** 菜单模式 */
  nzMode?: 'inline' | 'vertical' | 'horizontal'
  /** 点击菜单的回调 */
  nzClick?: EventEmitter<NzMenuItemDirective>
}

/** 搜索栏基本配置 */
interface ISearchBase<T = any> {
  /** 标签名 */
  label?: string
  /** 索引 */
  index: keyof T
  /** 默认值 */
  defaultValue?: any
  /** 占位符 */
  placeholder?: string | string[]
  /** 类型 */
  type: 'input' | 'select' | 'render'
  /** 是否清除, 显性设置为false禁用 */
  clear?: boolean
  /** 宽度 */
  width?: number
}
// 输入框
interface ISearchInput<T> extends ISearchBase<T> {
  type: 'input'
  placeholder?: string
}
// 下拉框选项
export interface ISelectOption {
  label?: string
  value?: string | number
  disabled?: boolean
}
// 下拉框带数组
interface ISearchSelectWithOption<T> extends ISearchBase<T> {
  type: 'select'
  placeholder?: string
  /** 是否允许搜索 */
  nzShowSearch?: boolean
  /** 下拉框选项 */
  options: ISelectOption[]
}
// 下拉框带Observable
interface ISearchSelecWithObservable<T> extends ISearchBase<T> {
  type: 'select'
  placeholder?: string
  /** 是否允许搜索 */
  nzShowSearch?: boolean
  /** 下拉选择框流 */
  options: Observable<ISelectOption[]>
}

// 模板引用
interface ISearchRender<T> extends ISearchBase {
  type: 'render'
  render: TemplateRef<T>
}

/** 搜索栏组件配置 */
export type ISearchItem<T = any> =
  | ISearchInput<T>
  | ISearchSelectWithOption<T>
  | ISearchSelecWithObservable<T>
  | ISearchRender<T>
/** 搜索数据 */
export type ISearchValue<T = any> = {
  [K in keyof T]?: T[K]
}
