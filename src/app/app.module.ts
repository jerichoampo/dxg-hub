import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PostFeedModule } from './post-feed/post-feed.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './wildcard/page-not-found/page-not-found.component';
import { AuthService } from './auth.service';

@NgModule({
    imports: [
        BrowserModule,
        PostFeedModule,

        // firebase 
        AngularFireModule.initializeApp(environment.firebase, 'dxg-hub'),
        AngularFireDatabaseModule,
        AngularFireAuthModule,

        AppRoutingModule
    ],
    declarations: [
        AppComponent, 
        LoginComponent, 
        PageNotFoundComponent
    ],
    providers: [ AuthService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
