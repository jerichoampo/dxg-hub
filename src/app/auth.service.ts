import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private user: Observable<firebase.User>;
    private logged: Subject<boolean>;

    constructor(private fauth: AngularFireAuth, 
                private db: AngularFireDatabase, 
                private router: Router) { 

        this.user = fauth.authState;

        this.logged = new Subject();

        this.user.subscribe(
            (user) => {
                if (user) {
                    this.addUser(user);
                    this.logged.next(true);
                }
                else {
                    this.logged.next(false);
                }
            }
        );
    }

    signinWithGoogle() {
        return this.fauth.auth.signInWithPopup (
            new firebase.auth.GoogleAuthProvider()
        )
    }

    isLoggedIn(): Observable<boolean> {
        return this.logged.asObservable();
    }

    logout() {
        this.fauth.auth.signOut()
            .then(() => this.router.navigate(['/']));
    }

    private addUser(data) {
        this.db.
    }

}
 