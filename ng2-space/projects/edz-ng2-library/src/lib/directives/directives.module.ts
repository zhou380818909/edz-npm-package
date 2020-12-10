import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ScrollContentDirective } from './scroll-content.directive'
import { ScrollDirective } from './scroll.directive'

@NgModule({
  declarations: [ScrollDirective, ScrollContentDirective],
  imports: [
    CommonModule,
  ],
  exports: [ScrollDirective, ScrollContentDirective],
})
export class DirectivesModule { }
