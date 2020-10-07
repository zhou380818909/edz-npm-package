import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { LayerComponent } from './layer.component'

@NgModule({
  declarations: [LayerComponent],
  imports: [CommonModule, NzLayoutModule, NzIconModule],
  exports: [LayerComponent, NzLayoutModule, NzIconModule],
})
export class LayerModule {}
