import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from './journal.component';
import { CharacterComponent } from './character.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ JournalComponent, CharacterComponent ],
  exports: []
})
export class JournalModule { }
