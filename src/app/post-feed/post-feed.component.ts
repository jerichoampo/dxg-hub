import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post';

@Component({
  selector: 'post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {

    posts: Post[];

    constructor(private postService: PostService) {}

    ngOnInit() {
        this.postService.getPosts().subscribe(posts => this.posts = posts)
        // this.posts = posts
    }

}
