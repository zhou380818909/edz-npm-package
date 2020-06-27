import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchListComponent } from './search-list.component';


@NgModule({
  declarations: [ SearchListComponent ],
  imports: [
    CommonModule
  ],
  exports: [ SearchListComponent ]
})
export class SearchListModule { }
