import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { WarRoomComponent } from './war-room/war-room.component';
import { TavernComponent } from './tavern/tavern.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { JournalModule } from './journal/journal.module';
import { JournalComponent } from './journal/journal.component';
import { CharacterComponent } from './journal/character.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JournalModule,
    DashboardRoutingModule
  ],
  declarations: [  WarRoomComponent, TavernComponent ],
  exports: [ ]
})
export class DashboardModule { }
