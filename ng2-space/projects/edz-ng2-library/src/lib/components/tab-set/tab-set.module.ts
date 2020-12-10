import { NgModule } from '@angular/core'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { TabSetComponent } from './tab-set.component'

@NgModule({
  declarations: [TabSetComponent],
  imports: [NzTabsModule],
  exports: [NzTabsModule, TabSetComponent],
})
export class TabSetModule {}
