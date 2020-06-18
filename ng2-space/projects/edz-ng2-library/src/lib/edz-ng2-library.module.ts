import { NgModule, } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { SearchListComponent } from './search-list/search-list.component'
import { BoolTextComponent } from './bool-text/bool-text.component'
import { SecretTextComponent } from './secret-text/secret-text.component';

const components = [
    SearchListComponent,
    BoolTextComponent,
    SecretTextComponent,
    
]

@NgModule({ 
  declarations: components,
  imports: [
    CommonModule
  ],
  exports: components
})
export class EdzNg2LibraryModule { }
