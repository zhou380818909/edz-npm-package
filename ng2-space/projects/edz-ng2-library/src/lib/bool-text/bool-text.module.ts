import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { BoolTextComponent } from './bool-text.component'

@NgModule({
  declarations: [BoolTextComponent],
  imports: [CommonModule],
  exports: [ BoolTextComponent ]
})
export class BoolTextModule {}
