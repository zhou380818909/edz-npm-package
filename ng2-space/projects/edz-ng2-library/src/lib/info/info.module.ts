import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzGridModule, NzIconModule, NzToolTipModule, NzTypographyModule } from 'ng-zorro-antd'
import { InfoComponent } from './info.component'

@NgModule({
  declarations: [InfoComponent],
  imports: [NzGridModule, CommonModule, NzTypographyModule, NzToolTipModule, NzIconModule],
  exports: [InfoComponent, NzGridModule, NzTypographyModule, NzToolTipModule, CommonModule, NzIconModule],
})
export class InfoModule {}
