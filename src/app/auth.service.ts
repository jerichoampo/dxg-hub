import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { User } from './model/user';
import { Character } from './model/character';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userRef: AngularFirestoreDocument<User>;
    private user: ReplaySubject<User>;
    private userChanges: Subscription = null;


    constructor(private auth: AngularFireAuth, 
                private db: AngularFirestore,
                private router: Router) { 

        let _shouldReroute: boolean = null;
        
        this.user = new ReplaySubject<User>(1);

        this.auth.authState.subscribe((_currentUser) => {
            if (_currentUser) {
                this.userRef = this.db.doc(`/users/${ _currentUser.uid }`);
                this.userChanges = this.userRef.valueChanges().subscribe((_user: User)=>{
                    
                    // login user
                    if (_user) { 
                        this.user.next(_user);

                        if (_shouldReroute) {
                            this.router.navigate(['/']);
                        }
                    } 
                    // create user
                    else { 
                        this.userRef.set({
                            uid: _currentUser.uid,
                            email: _currentUser.email,
                            dateCreated: new Date().toDateString(),
                            dateUpdated: new Date().toDateString(),
                            displayName: _currentUser.displayName,
                            photoUrl: _currentUser.photoURL
                        });
                    }
                })
            } 
            else {
                this.userRef = null;
                this.user.next(null);
                if (this.userChanges) {
                    this.userChanges.unsubscribe();
                }

                _shouldReroute = true;
            } 
        });
    }

    get currentUser$(): Observable<User> {
        return this.user.asObservable()
    }

    signinWithGoogle() {
        this.auth.auth.signInWithPopup (
            new firebase.auth.GoogleAuthProvider()
        )
    }

    logout() {
        this.auth.auth.signOut()
            .then(() => this.router.navigate(['/login']))
            .catch((err) => console.log(err));
    }


    // WoW
    addWowCharacter(character: Character) {
        this.userRef.update({ "wow_character": character })
    }
}
 