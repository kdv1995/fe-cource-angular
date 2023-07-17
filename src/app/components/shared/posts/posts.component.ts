//Core
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

//Components
import { PostComponent } from './post/post.component';

//Services
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from './post/post.interface';
import { NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [
    PostComponent,
    PostComponent,
    NgFor,
    MatListModule,
    NgIf,
    MatButtonModule,
  ],
  standalone: true,
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: IPost[] = [];
  currentPostsPage: number = 1;
  destroy$ = new Subject<void>();
  constructor(private postsService: PostsService) {
    console.log(this.posts);
  }
  ngOnInit(): void {
    this.postsService
      .getPaginatedPosts(this.currentPostsPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe((posts) => (this.posts = posts));
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
