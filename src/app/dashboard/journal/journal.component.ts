import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireObject } from '../../../../node_modules/angularfire2/database';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent {

    private entry$: Observable<any>;

    constructor(private auth: AuthService,
                private db: AngularFirestore) {

                console.log(this.auth.userUid)
        const entryRef = this.db.firestore.collection('journals').doc(this.auth.userUid);

        entryRef.get().then((document) => {
            if (!document.exists) {
                let entry = {
                    published: false,
                    title: `Welcome ${ this.auth.userProfileData.displayName }!`,
                    shortDescription: "Your entry here..."
                }
                entryRef.set(entry);
            }
        })

    }

}
