import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { PageNotFoundComponent } from './wildcard/page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'posts', component: PostFeedComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
