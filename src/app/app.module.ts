import { environment } from '../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PostFeedModule } from './post-feed/post-feed.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './wildcard/page-not-found/page-not-found.component';
import { AuthService } from './auth.service';
import { HeaderComponent } from './header/header.component';
import { WowService } from './wow/wow.service';

@NgModule({
    imports: [
        BrowserModule,
        PostFeedModule,

        HttpClientModule,

        // firebase 
        AngularFireModule.initializeApp(environment.firebase, 'dxg-hub'),
        AngularFireDatabaseModule,
        AngularFirestoreModule.enablePersistence(),
        AngularFireAuthModule,

        AppRoutingModule
    ],
    declarations: [
        AppComponent, 
        LoginComponent, 
        PageNotFoundComponent,
        HeaderComponent,
    ],
    providers: [ AuthService, WowService ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
