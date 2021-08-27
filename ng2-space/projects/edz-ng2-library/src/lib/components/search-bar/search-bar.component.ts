/*
 * @Author: ChouEric
 * @Date: 2020-07-09 17:47:34
 * @Last Modified by: ChouEric
 * @Last Modified time: 2020-10-22 15:17:31
 * @Description: 优先调用父组件的ngOnChanges, 再调用ngOnInit钩子, 再调用子组件的ngOnChanges钩子, 再调用子组件的ngOnInit
 */
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input,
  OnChanges, OnInit, Output, SimpleChanges,
} from '@angular/core'
import { cloneDeep, isEqual, union } from 'lodash-es'
import { ISearchConfig, ISearchItem, ISearchValue } from '../../interfaces'

@Component({
  selector: 'edz-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnChanges {
  /** 搜索栏列表配置 */
  @Input()
  list: ISearchItem[] = []
  /** 搜索栏列表数据 */
  @Input()
  private value: ISearchValue = {}
  /** 搜索栏加载状态 */
  @Input()
  loading = false
  /** 搜索栏配置  */
  @Input()
  config: ISearchConfig = { }

  /** 搜索事件触发 */
  @Output()
  search = new EventEmitter<ISearchValue>()
  /** 重置事件触发 */
  @Output()
  reset = new EventEmitter()

  /** 渲染到模板的数据 */
  searchValue: ISearchValue = { }
  /** 搜索栏高度 */
  searchBarHeight = 0
  /** 是否折叠 */
  isCallapse = false
  /** 搜索栏配置 */
  searchBarConfig = {
    callapse: null,
    shadow: true,
    width: 240,
  }
  /** 用来重置的数据 */
  private initValue: ISearchValue = {}

  /** 搜索栏数据是否和初始化数据相等 */
  get resetDisabled() {
    return isEqual(this.initValue, this.searchValue)
  }

  constructor(private cdr: ChangeDetectorRef) {
  }

  /** 根据config配置初始化数据 */
  private initSearchValue() {
    if (Array.isArray(this.config) && this.config.length > 0) {
      this.initValue = this.config.reduce((pre, cur) => {
        if (cur.defaultValue) {
          pre[cur.index] = cur.defaultValue
        }
        return pre
      }, {})
      // 将初始化数据深克隆到渲染数据
      this.searchValue = cloneDeep(this.initValue)
    }
  }

  /** 根据value传入的值合并到searchValue, 实现传入空对象清空数据功能 */
  private mergeToSearchValue(data) {
    if (typeof data !== 'object') {
      return
    }
    // 深克隆, 防止子组件修改数据影响父组件
    const value = data
    // 搜索栏数据和传入的数据键名交集, 然后将传入的数据赋值给搜索栏数据
    union(Object.keys(this.searchValue), Object.keys(this.value)).forEach(key => {
      this.searchValue[key] = value[key]
    })
  }

  /** 首次将数据合并searchValue, 实现同属性覆盖功能 */
  private firstMergeToSearchValue(data) {
    if (typeof data !== 'object') {
      return
    }
    // 深克隆, 防止子组件修改数据影响父组件
    const value = data
    Object.keys(value).forEach(key => {
      if (value[key]) {
        this.searchValue[key] = value[key]
      }
    })
  }

  // 搜索按钮触发
  searchHandler() {
    this.search.emit(cloneDeep(this.searchValue))
  }
  // 键盘触发搜索
  keyHandler(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search.emit(cloneDeep(this.searchValue))
    }
  }
  // 重置触发事件
  resetHandler() {
    this.searchValue = cloneDeep(this.initValue)
    this.reset.emit(this.searchValue)
  }

  ngOnInit() {
    Object.assign(this.searchBarConfig, this.config)
    if (this.searchBarConfig.callapse >= 1) {
      this.searchBarHeight = this.searchBarConfig.callapse * 32 + (this.searchBarConfig.callapse - 1) * 4
    }
    this.search.emit(cloneDeep(this.searchValue))
  }

  ngOnChanges(changes: SimpleChanges) {
    // 初次修改数据, config和value同时调用.
    if (changes.config
      && changes.config.currentValue
      && changes.config.isFirstChange()
      && changes.config.currentValue !== changes.config.previousValue) {
      this.initSearchValue()
      this.firstMergeToSearchValue(this.value)
    }
    // 再次修改数据
    if (changes.value
      && changes.value.currentValue
      && !changes.value.isFirstChange()
      && changes.value.currentValue !== changes.value.previousValue) {
      // 如果传入的数据改变, 则重复合并searchValue的值
      this.mergeToSearchValue(this.value)
    }
  }
}
