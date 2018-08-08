import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostFeedComponent } from './post-feed.component';
import { PostComponent } from './post/post.component';
import { PostInputComponent } from './post-input/post-input.component';
import { PostService } from './post.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        PostFeedComponent, 
        PostComponent, 
        PostInputComponent
    ],
    exports: [
        PostFeedComponent
    ],
    providers: [
        PostService
    ]
})
export class PostFeedModule { }
