//Core
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

//Components
import { PostComponent } from './post/post.component';
import { ModifyComponent } from './post/modify/modify.component';

//Services
import { PostsService } from 'src/app/services/posts.service';

//Materials
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

//Router
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';

//Interface
import { IPaginationPostsData, IPost } from './post/post.interface';

//Pipes
import { LanguagePipe } from 'src/app/pipes/language.pipe';
import { LanguagesService } from 'src/app/services/languages.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  imports: [
    RouterOutlet,
    PostComponent,
    MatOptionModule,
    MatSelectModule,
    MatFormFieldModule,
    NgFor,
    MatListModule,
    NgIf,
    MatButtonModule,
    FormsModule,
    RouterLink,
    ModifyComponent,
    AsyncPipe,
    RouterLink,
    LanguagePipe,
    MatPaginatorModule,
  ],
  standalone: true,
})
export class PostsComponent implements OnInit, OnDestroy {
  selected: string = '';
  currentLanguage: string;
  currentUrl: string = this.router.url;

  creatingPost: boolean = false;
  editingPost: boolean = false;

  pageSizeOptions: number[] = [5, 10, 15];
  posts$: Observable<IPost[]>;
  paginationPostsData: IPaginationPostsData = {
    pageIndex: 1,
    pageSize: 10,
    length: 10,
  };

  destroy$ = new Subject<void>();

  constructor(
    private postsService: PostsService,
    private router: Router,
    private languageService: LanguagesService
  ) {}
  ngOnInit(): void {
    this.languageService.language$.subscribe(
      (language) => (this.currentLanguage = language)
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.editingPost = event.url.includes('/posts/edit');
        this.creatingPost = event.url === '/posts/create';
      }
    });
    this.posts$ = this.postsService
      .getPaginatedPosts(this.paginationPostsData)
      .pipe(
        map(({ posts }) => {
          return posts;
        })
      );
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onPageChange(event: PageEvent) {
    this.paginationPostsData = {
      length: event.length,
      pageIndex: event.pageIndex + 1,
      pageSize: event.pageSize,
    };
    this.posts$ = this.postsService
      .getPaginatedPosts(this.paginationPostsData)
      .pipe(
        map(({ postsByPage, posts, currentPageNumber }) => {
          this.paginationPostsData.length = postsByPage;
          this.paginationPostsData.pageSize = postsByPage;
          this.paginationPostsData.pageIndex = currentPageNumber;
          return posts;
        }),
        map((posts) => posts)
      );
    console.log(this.paginationPostsData);
  }
  private filterPostsByPagination(posts: IPost[]): IPost[] {
    const startIndex = this.paginationPostsData.pageIndex - 1;
    const endIndex = startIndex + this.paginationPostsData.pageSize;
    return posts.slice(startIndex, endIndex);
  }
}
