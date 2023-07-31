//Core
import { Component, OnDestroy, OnInit } from '@angular/core'
import { map, Observable, Subject } from 'rxjs'
import { AsyncPipe, NgFor, NgIf } from '@angular/common'

//Components
import { PostComponent } from './post/post.component'
import { ModifyComponent } from './post/modify/modify.component'

//Services
import { PostsService } from 'src/app/services/posts.service'

//Materials
import { MatButtonModule } from '@angular/material/button'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MatListModule } from '@angular/material/list'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatOptionModule } from '@angular/material/core'
import { MatSelectModule } from '@angular/material/select'

//Router
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router'

//Interface
import { IPaginationPostsData, IPost } from './post/post.interface'

//Pipes
import { LanguagePipe } from 'src/app/pipes/language.pipe'
import { LanguagesService } from 'src/app/services/languages.service'
import { UserService } from 'src/app/services/user.service'

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
  //Router and Url
  currentLanguage: string
  currentUrl: string = this.router.url

  //Conditions
  creatingPost: boolean = false
  editingPost: boolean = false

  //Posts
  posts$: Observable<IPost[]>
  users$: Observable<any[]>
  pageSizeOptions: number[] = [5, 10, 15]
  paginationPostsData: IPaginationPostsData = {
    pageIndex: 1,
    pageSize: 15,
    length: 15,
  }

  //UserId
  userId: string | null = localStorage.getItem('userId')

  //Filters
  filterTypeArray: string[] = ['User']
  selectedFilterType: string = ''
  selectedUserID: string = ''

  //Destroy
  destroy$ = new Subject<void>()

  constructor(
    private postsService: PostsService,
    private router: Router,
    private languageService: LanguagesService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.languageService.language$.subscribe(
      (language) => (this.currentLanguage = language),
    )
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.editingPost = event.url.includes('/posts/edit')
        this.creatingPost = event.url === '/posts/create'
      }
    })
    this.posts$ = this.postsService
      .getPaginatedPosts(this.paginationPostsData)
      .pipe(
        map(({ currentPageNumber, postsByPage, countOfPosts, posts }) => {
          this.paginationPostsData = {
            pageIndex: currentPageNumber,
            pageSize: postsByPage,
            length: countOfPosts,
          }
          return posts
        }),
      )
  }
  onPageChange(event: PageEvent) {
    this.paginationPostsData = {
      length: event.length,
      pageIndex: event.pageIndex + 1,
      pageSize: event.pageSize,
    }
    this.posts$ = this.postsService
      .getPaginatedPosts(this.paginationPostsData)
      .pipe(
        map(({ postsByPage, posts, currentPageNumber }) => {
          this.paginationPostsData.pageSize = postsByPage
          this.paginationPostsData.pageIndex = currentPageNumber
          return posts
        }),
        map((posts) => posts),
      )
  }
  onSelectionChangeByFilterType(event: HTMLInputElement) {
    this.selectedFilterType = event.value
    this.users$ = this.userService.getAllUser()
  }
  onSelectionChangeForPostsByUsers(event: HTMLInputElement) {
    this.selectedUserID = event.value
    this.posts$ = this.postsService.getPostsByUserID(this.selectedUserID)
  }
  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
