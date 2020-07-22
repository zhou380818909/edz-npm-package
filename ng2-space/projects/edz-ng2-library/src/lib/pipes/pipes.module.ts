import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FinancePipe } from './finance.pipe'
import { TimePipe } from './time.pipe'

@NgModule({
  declarations: [FinancePipe, TimePipe],
  imports: [CommonModule],
  exports: [FinancePipe, TimePipe],
})
export class PipesModule {}
