import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private usersPath: string = '/users';
    private userData:  BehaviorSubject<any>;

    constructor(private auth: AngularFireAuth, 
                private db: AngularFirestore,
                private router: Router) { 

        this.userData = new BehaviorSubject<any>(null);

        this.auth.authState.subscribe((currentUser) => {
            if (currentUser) {
                console.log('authenticated, not logged in')

                this.queryUser(currentUser)
                    .then((currentUserData) => {
                        console.log(currentUserData)
                        this.userData.next(currentUserData);
                        console.log('authenticated, logged in')

                    });
            } 
            else {
                console.log('not authenticated')

                this.userData.next(null)
            } 
        });
    }

    get authenticated$(): Observable<firebase.User> {
        return this.auth.authState;
    }

    get currentUser(): any {
        return this.userData.getValue()
    }

    get currentUser$(): Observable<any> {
        return this.userData.asObservable()
    }

    signinWithGoogle() {
        this.auth.auth.signInWithPopup (
            new firebase.auth.GoogleAuthProvider()
        ).then(() => this.router.navigate(['/']))
    }

    private queryUser(user: any) {
        const userRef = this.db.firestore
                            .collection(this.usersPath)
                            .doc(user.uid);

        return userRef.get().then((snapshot) => {
            if (!snapshot.exists) {
                let newUser = {
                    uid: user.uid,
                    email: user.email,
                    dateCreated: new Date().toDateString(),
                    dateUpdated: new Date().toDateString(),
                    displayName: user.displayName,
                    userImageUrl: user.photoURL
                };
                return userRef.set(newUser).then(() => this.getUser(user.uid));
            } else {
                return snapshot.data();
            }
        })
    }

    private getUser(uid: string) {
        const userRef = this.db.firestore
                            .collection(this.usersPath)
                            .doc(uid);

        return  userRef.get().then(user => user.data());
    }

    logout() {
        this.auth.auth.signOut()
            .then(() => this.router.navigate(['/login']))
            .catch((err) => console.log(err));
    }
}
 