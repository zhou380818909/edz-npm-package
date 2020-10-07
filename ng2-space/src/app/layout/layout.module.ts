import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FullScreenComponent } from './full-screen/full-screen.component'

@NgModule({
  declarations: [FullScreenComponent],
  exports: [FullScreenComponent],
  imports: [RouterModule],
})
export class LayoutModule {}
