import { NgModule } from '@angular/core'
import { NzCardModule } from 'ng-zorro-antd'
import { InfoModule } from '../../../../projects/edz-ng2-library/src/public-api'
import { StoreComponent } from './store.component'
import { StoreRouting } from './store.routing'

@NgModule({
  declarations: [StoreComponent],
  imports: [StoreRouting, InfoModule, NzCardModule],
})
export class StoreModule {}
