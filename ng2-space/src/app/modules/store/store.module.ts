import { NgModule } from '@angular/core'
import { InfoModule } from '../../../../projects/edz-ng2-library/src/public-api'
import { StoreComponent } from './store.component'
import { StoreRouting } from './store.routing'

@NgModule({
  declarations: [StoreComponent],
  imports: [StoreRouting, InfoModule],
})
export class StoreModule {}
