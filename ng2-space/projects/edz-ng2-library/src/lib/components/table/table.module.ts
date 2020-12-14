import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { TableComponent } from './table.component'

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, NzTableModule, NzToolTipModule, NzTypographyModule,
    NzIconModule, NzDropDownModule, NzCheckboxModule, FormsModule],
  exports: [TableComponent, NzTableModule, NzToolTipModule, NzTypographyModule,
    NzIconModule, NzDropDownModule, NzCheckboxModule, FormsModule],
})
export class TableModule { }
