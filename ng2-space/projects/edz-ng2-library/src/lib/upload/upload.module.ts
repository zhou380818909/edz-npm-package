import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NzButtonModule, NzIconModule, NzModalModule, NzToolTipModule, NzUploadModule } from 'ng-zorro-antd'
import { Upload } from './upload.component'

@NgModule({
  imports: [NzUploadModule, NzButtonModule, NzIconModule, NzModalModule, FormsModule, ReactiveFormsModule, NzToolTipModule],
  declarations: [Upload],
  exports: [Upload],
})
export class UploadModule {}
