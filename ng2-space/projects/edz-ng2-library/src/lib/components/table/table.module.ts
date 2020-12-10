import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { TableComponent } from './table.component'

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, NzTableModule, NzToolTipModule, NzTypographyModule],
  exports: [TableComponent, NzTableModule, NzToolTipModule, NzTypographyModule],
})
export class TableModule { }
