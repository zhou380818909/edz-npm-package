import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { Upload } from './upload.component'

@NgModule({
  imports: [NzUploadModule, NzButtonModule, NzIconModule, NzModalModule, FormsModule, ReactiveFormsModule, NzToolTipModule],
  declarations: [Upload],
  exports: [Upload],
})
export class UploadModule {}
