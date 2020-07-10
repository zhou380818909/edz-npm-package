import { NgModule } from '@angular/core'
import { NzTabsModule } from 'ng-zorro-antd'
import { TabSetComponent } from './tab-set.component'

@NgModule({
  declarations: [TabSetComponent],
  imports: [NzTabsModule],
  exports: [NzTabsModule, TabSetComponent],
})
export class TabSetModule {}
