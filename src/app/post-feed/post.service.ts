import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Post } from './post';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    private postsPath = '/posts';
    private postRef: AngularFireList<Post>;

    constructor(private db: AngularFireDatabase) {
        this.postRef = this.db.list(this.postsPath)
    }

    getPosts(): Observable<Post[]> {
        return this.postRef.valueChanges();
    }

    createPost(post: Post) {
        this.postRef.push(post);
    }
}
 