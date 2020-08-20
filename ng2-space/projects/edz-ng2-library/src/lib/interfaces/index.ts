import { HttpResponse } from '@angular/common/http'
import { EventEmitter, TemplateRef, Type } from '@angular/core'
import { NzMenuItemDirective, NzUploadFile, UploadFilter, UploadXHRArgs } from 'ng-zorro-antd'
import { Observable } from 'rxjs'

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
/** 互斥类型 */
export type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

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
  /** 是否是多选框 */
  nzShowCheckbox?: boolean
  /** 列标题的渲染 */
  titleRender?: TemplateRef<any>
  /** 数据组件模板渲染 */
  render?: TemplateRef<any>
  /** 数据组件渲染,  */
  component?: Type<any>
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
  /** 行高, 当设置列宽的时候, 可能s出现表格对不齐的问题, 需要设置行高 */
  lineHeight?: number
  /** 列宽固定左侧, 不要和左边的选择框同时使用 */
  nzLeft?: boolean
  /** 列表固定右侧 */
  nzRight?: boolean
  /** 文字溢出处理 */
  textOverflow?: 'ellipsis' | 'hidden'
  /** 文字悬浮提示 */
  tooltip?: boolean
  /** 文字溢出隐藏行数 */
  lineCamp?: number
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
export interface ITableConfig<T=object> {
  /** 表格总宽度, 出现横向滚动条 */
  width?: string
  /** 是否显示边框 */
  nzBordered?: boolean
  /** 分页大小范围 */
  nzPageSizeOptions?: number[]
  /** 单页是否隐藏分页 */
  nzHideOnSinglePage?: boolean
  /** 是否固定表格内容, false为不固定 */
  scroll?: boolean
  /** 表格总数 */
  totalData?: T[] | T
  /** 表格行高度 */
  rowHeight?: number
  /** 字体行高 */
  lineHeight?: number
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
  /** 是否在菜单中隐藏 */
  hidden?: boolean
  /** 是否新开窗口 */
  isBlank?: boolean
  /** tab页不可关闭 */
  disableClose?: boolean
  /** 不在tab中显示 */
  hiddenInTab?: boolean
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

interface ISearchSelectBase<T> extends ISearchBase<T> {
  type: 'select'
  /** 提示 */
  placeholder?: string
  /** 是否允许搜索 */
  nzShowSearch?: boolean
}

// 下拉框带数组
interface ISearchSelectWithOption<T> extends ISearchSelectBase<T> {
  /** 下拉框选项 */
  options: ISelectOption[]
}
// 下拉框带Observable
interface ISearchSelecWithObservable<T> extends ISearchSelectBase<T> {
  /** 下拉选择框流 */
  options$: Observable<ISelectOption[]>
}

// 模板引用
interface ISearchRender<T> extends ISearchBase {
  type: 'render'
  render: TemplateRef<T>
}

type ISearchSelect<T> = XOR<ISearchSelectWithOption<T>, ISearchSelecWithObservable<T>>

/** 搜索栏组件配置 */
export type ISearchItem<T = any> =
  | ISearchInput<T>
  | ISearchSelect<T>
  | ISearchRender<T>
/** 搜索数据 */
export type ISearchValue<T = any> = {
  [K in keyof T]?: T[K]
}

interface INzGrid {
  span?: number
  offset?: number
}

interface IInfoStyle {
  color?: string
  fontWeight?: string
  fontSize?: string
}

interface IInfoLabelStyle extends IInfoStyle {
  width?: string
}

/** 信息展示组件 */
export interface IInfoItem {
  /** 需要显示的label */
  label: string
  /** 展示数据的索引 */
  index: string
  /** 网格化列宽,总列宽24 */
  nzSpan?: number
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  nzOffset?: number
  /** 自定义渲染 */
  render?: TemplateRef<any>
  /** 是否溢出隐藏 */
  nzEllipsis?: boolean
  /** ≥1200px 响应式栅格 */
  nzXl?: INzGrid
  /** ≥1600px 响应式栅格  */
  nzXXl?: INzGrid
  /** 提示 */
  tips?: string
  /** label样式 */
  labelStyle?: IInfoLabelStyle
  /** label对齐的样式 */
  labelAlign?: 'right' | 'left' | 'center' | 'justify'
  /** value样式 */
  valueStyle?: IInfoStyle
}

export interface IInfoConfig {
  /** 栅格之间的宽度或者, 水平和垂直的宽度 */
  nzGutter?: [number, number]
  /** 默认的栅格占位, Xl: ≥1200px 响应式栅格, XXl: ≥1600px 响应式栅格 */
  nzSpan?: { xl: number, xxl: number }
  /** 自动溢出省略 */
  nzEllipsis?: boolean
  /** label样式 */
  labelStyle?: IInfoLabelStyle
  /** value样式 */
  valueStyle?: IInfoStyle
  /** label对齐的样式 */
  labelAlign?: 'right' | 'left' | 'center' | 'justify'
}

export interface IUploadConfig<T = any> {
  /** 文件数量限制, 默认为5 */
  count?: number
  /** 文件大小限制, 单位M, 最终将加入到filters */
  size?: number
  /** 文件类型, 限制选中文件夹选中 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#attr-accept */
  accept?: string
  /** 文件类型, 有message提示 */
  type?: string[]
  /** 文件上传到服务器的字段, 默认 file */
  name?: string
  /** 文件过滤器 */
  filters?: UploadFilter[]
  /** 是否支持多文件上传, 默认true */
  multiple?: boolean
  /** 文件上传的地址 */
  url: string
  /** 上传回调 */
  handler: (upload: UploadXHRArgs, res: HttpResponse<any>) => void,
  /** 数据转换 */
  transfer: {
    /** 将fileList转换为value, 双向数据绑定更新数据 */
    fileListToValue: (fileList: NzUploadFile[]) => T[],
    /** 将value转换为fileList, 双向数据绑定初始化数据 */
    valueToFileList: (value: T) => NzUploadFile[],
  }
}
