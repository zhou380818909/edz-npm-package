import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecretTextComponent } from './secret-text.component';



@NgModule({
  declarations: [ SecretTextComponent ],
  imports: [
    CommonModule
  ],
  exports: [ SecretTextComponent ]
})
export class SecretTextModule { }
