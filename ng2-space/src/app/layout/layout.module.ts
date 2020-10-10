import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EdzNg2LibraryModule } from '../../../projects/edz-ng2-library/src/public-api'
import { AsideComponent } from './aside/aside.component'
import { FullScreenComponent } from './full-screen/full-screen.component'

@NgModule({
  declarations: [FullScreenComponent, AsideComponent],
  exports: [FullScreenComponent, AsideComponent],
  imports: [RouterModule, EdzNg2LibraryModule],
})
export class LayoutModule {}
