import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { EdzNg2LibraryModule } from 'edz-ng2-library'
import { DefaultLayoutComponent } from './default-layout/default-layout.component'
import { FullScreenComponent } from './full-screen/full-screen.component'
@NgModule({
  declarations: [FullScreenComponent, DefaultLayoutComponent],
  exports: [FullScreenComponent],
  imports: [RouterModule, EdzNg2LibraryModule],
})
export class LayoutModule {}
