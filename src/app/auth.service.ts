import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { User } from './model/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private usersPath: string = '/users';
    private user: Observable<firebase.User>;
    // private userData: User = null;
    private userData: any = null;

    constructor(private fauth: AngularFireAuth, 
                private db: AngularFireDatabase, 
                private router: Router) { 

        this.user = fauth.authState;

        this.user.subscribe(
            (user) => {
                console.log(user)
                if (user) {
                    // this.login(user.uid);
                    this.userData = user
                }
                else {
                    this.userData = null
                }
            }
        );
    }

    get currentUserObservable(): any {
        return this.fauth.authState;
    }

    get authenticated(): boolean {
        return this.userData !== null;
    }

    signinWithGoogle() {
        this.fauth.auth.signInWithPopup (
            new firebase.auth.GoogleAuthProvider()
        )
        .then((res) => {
            console.log(res)
        }) 
    }

    logout() {
        console.log('logout')
        this.fauth.auth.signOut()
            .then(() => {this.router.navigate(['/']); console.log('signed out')})
            .catch((err) => console.log(err));
    }

    private login(uid: string) {
        let path = `${ this.usersPath }/${ uid }`;
        this.db.database
            .ref(path)
            .once('value', snapshot => {
                // create user if email does not exist
                if (!snapshot.exists()) {
                    this.db.object<User>(path)
                        .set(new User(uid, this.fauth.auth.currentUser.email, new Date().toDateString(), new Date().toDateString()))
                        .then(() => this.login(uid))
                        .catch(err => console.error(err))
                }
                else {
                    this.userData = snapshot.val();
                    console.log(this.userData != null)
                }
            })
    }

}
 