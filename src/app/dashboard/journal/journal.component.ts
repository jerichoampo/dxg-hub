import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { WowService } from '../../wow/wow.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent {

    private user: User;
    private wow_races$: Observable<any>;
    private wow_classes$: Observable<any>;


    private character = { realm: "Barthilas", name: "" };

    constructor(private auth: AuthService,
                private wow: WowService,
                private db: AngularFirestore) {

        this.auth.currentUser$.subscribe((rawUser) => {
            this.user = rawUser
        })
    }

    updateUser(realm: any, name: any, uid: any) {
        this.wow.getCharacter(realm, name)
            .then((res) => {
                this.auth.addWowCharacter(res);
            })
            .catch((err) => console.log(err))
    }

}
