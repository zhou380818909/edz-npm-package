import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzTypographyModule } from 'ng-zorro-antd/typography'
import { InfoComponent } from './info.component'

@NgModule({
  declarations: [InfoComponent],
  imports: [NzGridModule, CommonModule, NzTypographyModule, NzToolTipModule, NzIconModule],
  exports: [InfoComponent, NzGridModule, NzTypographyModule, NzToolTipModule, CommonModule, NzIconModule],
})
export class InfoModule {}
