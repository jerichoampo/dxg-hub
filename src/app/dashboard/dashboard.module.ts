import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { JournalComponent } from './journal/journal.component';
import { WarRoomComponent } from './war-room/war-room.component';
import { TavernComponent } from './tavern/tavern.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [ JournalComponent, WarRoomComponent, TavernComponent ],
  exports: [ ]
})
export class DashboardModule { }
