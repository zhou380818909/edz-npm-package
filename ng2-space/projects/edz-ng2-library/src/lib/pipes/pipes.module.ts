import { NgModule } from '@angular/core'
import { FinancePipe } from './finance.pipe'
import { TimePipe } from './time.pipe'

@NgModule({
  declarations: [FinancePipe, TimePipe],
  imports: [],
  exports: [FinancePipe, TimePipe],
})
export class PipesModule {}
