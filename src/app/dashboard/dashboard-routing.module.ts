import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { TavernComponent } from './tavern/tavern.component';
import { WarRoomComponent } from './war-room/war-room.component';

const routes: Routes = [
    { path: '', redirectTo: 'journal', pathMatch: 'full'  },
    { path: 'journal', component: JournalComponent  },
    { path: 'tavern', component: TavernComponent  },
    { path: 'war_room', component: WarRoomComponent  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
