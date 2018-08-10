import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Observable } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    private headerVisibility$: Observable<boolean>;

    constructor(private auth: AuthService) {
        this.headerVisibility$ = this.auth.authenticated$.pipe(map(user => !!user))
    }

    logout() { this.auth.logout() }

}
