import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzTableModule, NzToolTipModule, NzTypographyModule } from 'ng-zorro-antd'
import { TableComponent } from './table.component'

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, NzTableModule, NzToolTipModule, NzTypographyModule],
  exports: [TableComponent, NzTableModule, NzToolTipModule, NzTypographyModule],
})

export class TableModule { }
