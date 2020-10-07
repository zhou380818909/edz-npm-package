import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzSpinModule } from 'ng-zorro-antd/spin'
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
