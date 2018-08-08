import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'post-input',
  templateUrl: './post-input.component.html',
  styleUrls: ['./post-input.component.css']
})
export class PostInputComponent {

    submitted = false
    post = new Post("1", "", "", "1", new Date().toDateString())

    constructor(private postService: PostService) {}

    submitPost() {
        this.submitted = true;
        this.postService.createPost(this.post)
    }
}
