import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { PageNotFoundComponent } from './wildcard/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ]},
    { path: 'login', component: LoginComponent },
    { path: 'posts', component: PostFeedComponent, canActivate: [ AuthGuardService ]},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
