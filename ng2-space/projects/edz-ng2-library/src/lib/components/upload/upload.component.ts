import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http'
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { NzMessageService } from 'ng-zorro-antd/message'
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload'
import { fromEvent, Subscription } from 'rxjs'
import { IUploadConfig } from '../../interfaces'

type FileType = 'image' | 'pdf' | 'word' | 'excel' | 'ppt' | 'unknown'
/** 图片后缀名正则校验 */
const imageReg = /.*(\.png|\.jpg|\.jpeg|\.gif|\.webp|\.bmp)$/i

/** 判断文件格式 */
export const getFileType = (file: File | Blob | string): FileType => {
  if (typeof file === 'string') {
    if (imageReg.test(file)) {
      return 'image'
    }
    return 'unknown'
  }
  if (file.type.startsWith('image/')) {
    return 'image'
  }
  if (file.type === 'application/pdf') {
    return 'pdf'
  }
  return 'unknown'
}

@Component({
  selector: 'edz-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UploadComponent), multi: true },
  ],
})
export class UploadComponent implements OnInit, OnDestroy, ControlValueAccessor {
  /** 上传文件显示的样式 */
  @Input()
  listType: 'text' | 'picture-card' = 'picture-card'
  /** 是否只读 */
  @Input()
  readonly = false
  /** 上传配置 */
  @Input()
  config: IUploadConfig = {} as IUploadConfig
  /** 值改变事件 */
  @Output()
  valueChange = new EventEmitter()

  /** 双向数据绑定文件列表 */
  fileList: NzUploadFile[] = []
  /** 上传配置 */
  uploadConfig: IUploadConfig = {
    count: 5,
    size: 0,
    multiple: true,
    accept: '',
    filters: [],
    name: 'file',
    url: '',
    handler: (upload, res) => {
      if (res.body && res.body.code === 0) {
        upload.onSuccess(res.body, upload.file, res)
      } else {
        upload.onError('上传失败!', upload.file)
      }
    },
    transfer: {
      valueToFileList: value => value.map((item, index) => ({
        name: `文件${index + 1}`,
        uid: Math.random().toString(36).substring(2),
        filename: `文件${index + 1}`,
        response: { code: 0, data: item },
        percent: 100,
        thumbUrl: item,
        status: 'done',
        url: item,
      })),
      fileListToValue: fileList => fileList.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => item.response?.data || ''),
    },
  }
  /** 预览的地址 */
  previewUrl
  /** 预览的文件类型 */
  previewType: FileType
  /** 是否显示预览弹框 */
  showPreview = false
  /** 生成的预览urlobject, 在取消预览的时候需要销毁 */
  private objectUrl: string
  /** 文件上传的队列 */
  // private uploadFileQueue = []
  /** 文件读取器 */
  private fileReader: FileReader
  onChangeFn
  onTouchFn

  /** 自定义上传方法, 不是事件 */
  uploader = (upload: NzUploadXHRArgs): Subscription => {
    const { file, postFile } = upload
    // this.uploadFileQueue.push(file)
    const formdata = new FormData()
    formdata.append(this.uploadConfig.name, postFile as Blob)
    const req = new HttpRequest('POST', this.uploadConfig.url, formdata, {
      reportProgress: true,
      withCredentials: true,
      headers: new HttpHeaders({ 'X-Requested-With': 'XMLHttpRequest' }),
    })
    return this.http.request(req)
      .subscribe(
        (res: HttpEvent<any>) => {
          if (res.type === HttpEventType.UploadProgress) {
            if (res.total > 0) {
              (res as any).percent = (res.loaded / res.total) * 100
            }
            upload.onProgress(res, file)
          } else if (res.type === HttpEventType.Response) {
            this.uploadConfig.handler(upload, res)
          }
        },
        error => {
          // this.uploadFileQueue.splice(this.uploadFileQueue.findIndex(item => item.uid === file.uid), 1)
          this.message.warning('上传失败, 请重试')
          upload.onError('上传失败!', file)
          console.warn('上传文件失败!', error)
        },
      )
  }

  constructor(private dom: DomSanitizer, private http: HttpClient, private message: NzMessageService, private cdr: ChangeDetectorRef) {
    this.previewUrl = dom.bypassSecurityTrustResourceUrl('')
  }

  /** 取消预览 */
  okHandler() {
    this.showPreview = false
    this.previewUrl = this.dom.bypassSecurityTrustResourceUrl('')
    // 销毁URLObject
    if (this.objectUrl) {
      window.URL.revokeObjectURL(this.objectUrl)
      this.objectUrl = null
    }
  }

  // /** 下载事件 */
  // downloadFile = (file: NzUploadFile) => {
  // }

  /** 预览事件, 由于需要销毁objectUrl */
  previewFile = (file: NzUploadFile) => {
    const fileType = getFileType(file.originFileObj ? file.originFileObj : file.response?.data)
    // 如果是图片格式, 则采用弹框预览
    if (fileType === 'image') {
      this.showPreview = true
      // 如果有本地预览文件, 则打开本地预览图片
      if (file.originFileObj) {
        if (!this.fileReader) {
          this.fileReader = new FileReader()
        }
        const subscription = fromEvent(this.fileReader, 'loadend').subscribe(() => {
          this.previewUrl = this.fileReader.result
          subscription.unsubscribe()
        })
        this.fileReader.readAsDataURL(file.originFileObj)

      // 如果是远程文件, 打开资源的url
      } else {
        this.previewUrl = this.dom.bypassSecurityTrustResourceUrl(file.response?.data || '')
      }

    // 如果是非图片格式, 则采用浏览器新窗口打开
    } else {
      // 销毁上一个objectUrl
      if (this.objectUrl) {
        window.URL.revokeObjectURL(this.objectUrl)
        this.objectUrl = null
      }
      // 如果是本地上传, 则采用本地文件预览
      if (file.originFileObj) {
        this.objectUrl = window.URL.createObjectURL(file.originFileObj)
        window.open(this.objectUrl, file.originFileObj.name)

      // 如果是远程文件, 打开资源的url
      } else {
        window.open(file.response.data)
      }
    }
  }

  /** 上传文件前校验, 主要用来限制上传文件个数 */
  beforeUpload = (file: NzUploadFile, fileList: NzUploadFile[]): boolean => {
    const count = fileList.filter(item => item.status === 'success' || item.status === 'done').length
    if (count > this.uploadConfig.count) {
      return false
    }
    return true
  }

  /** 文件改变回调 */
  changeHandler(param: NzUploadChangeParam) {
    if (param.type === 'success') {
      const count = param.fileList.filter(item => item.status === 'success' || item.status === 'done').length
      if (count > this.uploadConfig.count) {
        this.message.warning(`上传成功的文件超过${this.uploadConfig.count}, 已忽略后面上传的文件`)
        const existIndex = this.fileList.findIndex(item => item.uid === param.file.uid)
        param.fileList.splice(existIndex, 1)
      }
      const value = this.uploadConfig.transfer.fileListToValue(param.fileList.filter(item => item.status === 'success'
        || item.status === 'done'))
      this.onChangeFn(value)
      this.valueChange.next(value)
    } else if (param.type === 'removed') {
      const value = this.uploadConfig.transfer.fileListToValue(param.fileList.filter(item => item.status === 'success'
        || item.status === 'done'))
      this.onChangeFn(value)
      this.valueChange.next(value)
    }
  }

  writeValue(value: any[] = []) {
    if (Array.isArray(value)) {
      if (typeof (this.uploadConfig?.transfer?.valueToFileList || '') === 'function') {
        this.fileList = this.uploadConfig.transfer.valueToFileList(value)
      }
    }
  }

  setDisabledState() {}

  registerOnChange(fn) {
    this.onChangeFn = fn
  }

  registerOnTouched(fn) {
    this.onTouchFn = fn
  }

  ngOnInit() {
    if (Array.isArray(this.config.type) && this.config.type.length > 0) {
      this.uploadConfig.filters.push({
        name: 'type',
        fn: (fileList: NzUploadFile[]): NzUploadFile[] => {
          const filterFiles = fileList.filter(w => this.config.type.some(item => w.type.includes(item)))
          if (filterFiles.length !== fileList.length) {
            this.message.warning(`上传的文件类型不正确, 只能是${this.config.type.join(',')}格式`)
            return filterFiles
          }
          return fileList
        },
      })
    }
    if (this.config.size > 0) {
      this.uploadConfig.filters.push({
        name: 'size',
        fn: (fileList: NzUploadFile[]): NzUploadFile[] => {
          const filterFiles = fileList.filter(w => w.size <= this.config.size * 1024 * 1024)
          if (filterFiles.length !== fileList.length) {
            this.message.warning(`上传的文件不能超过${this.config.size}MB!`)
            return filterFiles
          }
          return fileList
        },
      })
    }
    Object.assign(this.uploadConfig, this.config)
  }

  ngOnDestroy() {
    if (this.objectUrl) {
      window.URL.revokeObjectURL(this.objectUrl)
      this.objectUrl = null
    }
  }
}
