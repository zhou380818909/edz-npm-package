import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ScrollComponent } from './scroll.component'
import { ScrollContentComponent } from './scroll-content.component'

@NgModule({
  declarations: [ScrollComponent, ScrollContentComponent],
  imports: [CommonModule],
  exports: [ScrollComponent, ScrollContentComponent],
})
export class ScrollModule {}
