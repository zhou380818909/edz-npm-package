import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'
import { IColumnItem, ISearchItem, ITableConfig, IUploadConfig } from '../../../../projects/edz-ng2-library/src/lib/interfaces'
import { HttpService } from '../../../../projects/edz-ng2-library/src/lib/services'
import { Info } from './info.component'
import { Summary } from './sumary.component'

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
})
export class CustomerManagementComponent implements OnInit, OnDestroy {
  text = '13211111111'
  options = [
    { key: 'id', value: '北京' },
  ]
  date=null
  showPhone() {
    setTimeout(() => {
      this.text = '13211112222'
    }, 1000)
  }
  onBtnClick() {
    console.warn(this.date)
  }
  dateChange(date) {
    console.warn(date)
  }
  searchValue = { city: '2' } as any
  searchBarConfig: ISearchItem[] = []
  column: IColumnItem[] = []
  columnGroup: IColumnItem[] = []
  tableConfig: ITableConfig = {
    scroll: true,
    width: '2600px',
  }
  tableData = [
    {
      name: '看看',
      score: '清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风清风',
      id: 1,
      style: { color: 'red' },
    },
    {
      name: '看看',
      score: '清风',
      id: 2,
    },
    {
      name: '看看',
      score: '清风',
      id: '3',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
    {
      name: '看看',
      score: '清风',
    },
  ]
  uploadFile = ['https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3644870016,1608664289&fm=26&gp=0.jpg',
    'http://placekitten.com/300/300',
    'https://edianzu-oss-work-order.oss-cn-beijing.aliyuncs.com/order_attachments/6bc73abdd87750d23c4422d67bfeb5a6.pdf']
  uploadConfig: IUploadConfig<string[]> = {
    name: 'fileData',
    url: '/upload-api/fileOpt/fileUpload',
    handler: (upload, res) => {
      if (res.body && res.body.code === 0) {
        upload.onSuccess(res.body, upload.file, res)
      } else {
        this.message.warning('上传失败')
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

  dateValue = null

  @ViewChild('date', { static: true })
  dateComponent
  @ViewChild('ellipsis', { static: true })
  ellipsisComponent

  constructor(private http: HttpService, private message: NzMessageService, private router: Router) {
    // this.http.post('http://localhost:3000/posts', { query: { a: 1 }, json: [{ b: 1 }] }).subscribe(() => {})
  }

  initRender() {
    this.column = [
      // {
      //   title: '',
      //   index: 'id',
      //   nzShowCheckbox: true,
      //   nzLeft: true,
      //   width: '48px',
      // },
      {
        title: '姓名',
        index: 'name',
        nzLeft: true,
        width: '300px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
        textOverflow: 'ellipsis',
        lineCamp: 2,
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
        component: Summary,
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
        component: Info,
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
        width: '200px',
      },
      {
        title: '姓名',
        index: 'score',
      },
      {
        title: '姓名',
        index: 'score',
        width: '100px',
        nzRight: true,
        textOverflow: 'ellipsis',
        tooltip: true,
        lineCamp: 3,
      },
      {
        title: '姓名1',
        index: 'score',
        width: '200px',
        nzRight: true,
      },
    ]
    this.columnGroup = [
      {
        title: '1',
        index: 'name',
        colspan: 2,
        rowspan: 1,
      },
      {
        title: '2',
        index: 'name',
        colspan: 1,
        rowspan: 1,
      },
      {
        title: '2',
        index: 'name',
        colspan: 1,
        rowspan: 1,
      },
      {
        title: '1',
        index: 'name',
        rowspan: 2,
        colspan: 1,
      },
      {
        title: '1',
        index: 'name',
        rowspan: 2,
        colspan: 1,
      },
      {
        title: '1',
        index: 'name',
        colspan: 2,
        rowspan: 1,
      },
      {
        title: '2',
        index: 'name',
        colspan: 1,
        rowspan: 1,
      },
      {
        title: '2',
        index: 'name',
        colspan: 1,
        rowspan: 1,
      },
      {
        title: '2',
        index: 'name',
        colspan: 2,
        rowspan: 1,
      },
    ]
  }

  searchHandler(value) {
    this.searchValue = value
    console.warn(value)
  }

  uploadChangeHandler() {
    console.log(this.uploadFile);
  }

  initSearch() {
    this.searchBarConfig = [
      { label: '姓名', index: 'name', type: 'input', defaultValue: '丛丛' },
      { label: '城市', index: 'city', type: 'select', options: [{ value: '1', label: '衡水' }, { value: '2', label: '株洲' }] },
      { label: '时间', index: 'date', type: 'render', render: this.dateComponent, defaultValue: new Date('2000/09/12 20:20:20') },
    ]
  }

  clickHandler(e) {
    console.warn(e)
  }

  login() {
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
    this.initSearch()
    this.initRender()
    setTimeout(() => {
      console.warn(this.searchValue)
    }, 8000)
    // setTimeout(() => {
    //   this.tableConfig = {
    //     ...this.tableConfig,
    //     totalData: [{ name: '总数1', score: 11 }, { name: '总数2', score: 66 }],
    //   }
    // }, 5000)
    this.http.get('http://localhost:3000/api/', {}, { callback: console.warn }).subscribe(() => {})
  }

  ngOnDestroy() {
    console.warn('customer-destroy')
  }
}
