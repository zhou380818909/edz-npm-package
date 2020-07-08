import { NgModule } from '@angular/core'
import { StoreComponent } from './store.component'
import { StoreRouting } from './store.routing'

@NgModule({
  declarations: [StoreComponent],
  imports: [StoreRouting],
})
export class StoreModule {}
