import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { tap, map, take, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private auth: AuthService, 
                private router: Router) {}

    canActivate(): Observable<boolean> {
        return this.auth.currentUser$
                    .pipe(
                        first(),
                        map(user => !!user),
                        tap(loggedIn => {
                            if(!loggedIn) {
                                this.router.navigate(['/login'])
                            }
                        })
                    );
    }
}
