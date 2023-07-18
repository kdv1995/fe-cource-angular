//Core
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

//Components
import { PostComponent } from './post/post.component';

//Services
import { PostsService } from 'src/app/services/posts.service';
import { IPost } from './post/post.interface';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { ModifyComponent } from './post/modify/modify.component';
import { LanguagePipe } from 'src/app/pipes/language.pipe';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [
    RouterOutlet,
    PostComponent,
    NgFor,
    MatListModule,
    NgIf,
    MatButtonModule,
    RouterLink,
    ModifyComponent,
    AsyncPipe,
    LanguagePipe,
    RouterLink,
  ],
  standalone: true,
})
export class PostsComponent implements OnInit, OnDestroy {
  creatingPost: boolean = false;
  editingPost: boolean = false;
  currentUrl: string = this.router.url;
  defaultLocale: string = 'eng';
  posts: IPost[] = [];
  currentPostsPage: number = 1;
  destroy$ = new Subject<void>();
  constructor(private postsService: PostsService, public router: Router) {}
  /**
   * openEditPostPage
   */
  public openEditPostPage() {
    this.router.navigate(['/create']);
  }

  /**
   * openCreatePostPage
   */
  public openCreatePostPage() {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.editingPost = event.url.includes('/posts/edit');
        this.creatingPost = event.url === '/posts/create';
      }
    });
    this.postsService
      .getPaginatedPosts(this.currentPostsPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ posts }) => (this.posts = posts));
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
