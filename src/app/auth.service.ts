import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, of } from 'rxjs';
import { User } from './model/user';
import { AngularFirestore } from '../../node_modules/angularfire2/firestore';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private usersPath: string = '/users';
    private authState: firebase.User = null;
    private userData:  any = null;

    constructor(private fauth: AngularFireAuth, 
                private db: AngularFireDatabase, 
                private fdb: AngularFirestore,
                private router: Router) { 

        this.fauth.authState.subscribe((auth) => {
            if (auth) {
                this.loginUser(auth)
            }
        });
    }

    get authenticatedObservable(): any {
        return this.fauth.authState;
    }

    get authenticated(): boolean {
        return this.userData !== null;
    }

    get userUid(): string {
        return this.userData ? this.userData.uid : '';
    }
    
    get userProfileData(): User {
        return this.authenticated ? this.userData : null;
    }

    signinWithGoogle() {
        this.fauth.auth.signInWithPopup (
            new firebase.auth.GoogleAuthProvider()
        )
        // .then((res) => this.loginUser(res.user)) 
    }

    private loginUser(data: any) {
        let path = `${ this.usersPath }/${ data.uid }`;

        const userListener$ = this.fdb.firestore.doc(path).onSnapshot(snapshot => {
            if (!snapshot.exists) {
                let user = {
                    uid: data.uid,
                    email: data.email,
                    dateCreated: new Date().toDateString(),
                    dateUpdated: new Date().toDateString(),
                    displayName: data.displayName,
                    userImageUrl: data.photoURL
                }                

                this.fdb.doc(path).set(user);
            }
            else {
                this.userData = snapshot.data();
                this.router.navigate(['/']);
                userListener$();
            }
        })
    }

    logout() {
        this.fauth.auth.signOut()
            .then(() => {
                this.userData = null;
                this.router.navigate(['/login'])
            })
            .catch((err) => console.log(err));
    }

    // private loginUser(data: any) {
    //     let path = `${ this.usersPath }/${ data.user.uid }`;
    //     this.db.database
    //         .ref(path)
    //         .once('value', snapshot => {
    //             if (!snapshot.exists()) {
    //                 let user = new User(
    //                     data.user.uid,
    //                     data.user.email,
    //                     new Date().toDateString(),
    //                     new Date().toDateString(),
    //                     data.user.displayName,
    //                     data.user.photoURL
    //                 )

    //                 this.db.object<User>(path).set(user)
    //                     .then(() => this.loginUser(data))
    //                     .catch(err => console.error(err))
    //             }
    //             else {
    //                 this.userData = snapshot.val();
    //                 this.router.navigate(['/']);
    //             }
    //         })
    // }

    // logout() {
    //     this.fauth.auth.signOut()
    //         .then(() => this.router.navigate(['/login']))
    //         .catch((err) => console.log(err));
    // }
}
 