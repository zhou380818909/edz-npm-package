import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ShowButtonDirective } from './show-button.directive'

const directives = [ShowButtonDirective]

@NgModule({
  declarations: directives,
  imports: [CommonModule],
  exports: directives,
})
export class DidrectivesModule {}
