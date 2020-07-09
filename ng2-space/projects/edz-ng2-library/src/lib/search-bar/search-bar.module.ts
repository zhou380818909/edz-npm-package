import { NgModule } from '@angular/core'
import { NzSpinModule, NzInputModule, NzIconModule, NzSelectModule, NzButtonModule } from 'ng-zorro-antd'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { SearchBarComponent } from './search-bar.component'

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, NzSpinModule, NzInputModule, FormsModule, NzIconModule, HttpClientModule, NzSelectModule, NzButtonModule],
  exports: [CommonModule,
    SearchBarComponent,
    NzSpinModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
    HttpClientModule,
    NzSelectModule,
    NzButtonModule],
})
export class SearchBarModule {}
