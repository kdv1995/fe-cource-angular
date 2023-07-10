import { Component, OnInit } from '@angular/core';

import { delay, Observable, tap } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from './post/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts$: Observable<IPost[]>;
  loading: boolean = false;

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.posts$ = this.postsService
      .getPosts()
      .pipe(tap(() => (this.loading = false)));
  }
  onDeletePost(id: string) {
    this.postsService.deletePost(id);
  }
}
