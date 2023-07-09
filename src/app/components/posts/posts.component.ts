import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { Post } from './post/post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  private postsSub: Subscription = new Subscription();
  public posts: Post[] = [];

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostsUpdateListener()
      .subscribe((posts: Post[]) => (this.posts = posts));
  }
  onDeletePost(id: string) {
    this.postsService.delelePost(id);
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
