import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from './post/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit, OnDestroy {
  private postsSub: Subscription = new Subscription();
  public posts: IPost[] = [];

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostsUpdateListener()
      .subscribe((posts: IPost[]) => (this.posts = posts));
  }
  onDeletePost(id: string) {
    this.postsService.deletePost(id);
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }
}
