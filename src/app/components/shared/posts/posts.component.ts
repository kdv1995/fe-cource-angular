//Core
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

//Components
import { PostComponent } from './post/post.component';
import { ModifyComponent } from './post/modify/modify.component';

//Services
import { PostsService } from 'src/app/services/posts.service';
import { LanguagesService } from 'src/app/services/languages.service';

//Materials
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

//Router
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

//Interface
import { IPost, IPostResponse } from './post/post.interface';

//Pipes
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
    RouterLink,
    LanguagePipe,
  ],
  standalone: true,
})
export class PostsComponent implements OnInit, OnDestroy {
  currentUrl: string = this.router.url;
  currentLanguage: string = 'en';

  creatingPost: boolean = false;
  editingPost: boolean = false;

  currentPostsPage: number = 1;
  posts$: Observable<IPost[]>;

  destroy$ = new Subject<void>();

  constructor(
    private postsService: PostsService,
    public router: Router,
    private languageService: LanguagesService
  ) {}
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
    this.posts$ = this.postsService
      .getPaginatedPosts(this.currentPostsPage)
      .pipe(map(({ posts }: IPostResponse) => posts));
    this.languageService.language$.subscribe((language) => {
      this.currentLanguage = language;
    });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
