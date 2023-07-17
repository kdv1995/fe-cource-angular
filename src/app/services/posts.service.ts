//Core
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

//Http
import { HttpClient } from '@angular/common/http';
import {
  IPost,
  currentPageRequest,
} from '../components/shared/posts/post/post.interface';

//Environment
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  ApiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}
  /**
   * getPosts
   */
  public getPaginatedPosts(
    currentPage: currentPageRequest
  ): Observable<IPost[]> {
    // return this.http.get<IPost[]>('http://localhost:4000/api/posts');
    return this.http
      .get<IPost[]>(`${this.ApiUrl}posts/postsByPage?page=${currentPage}`)
      .pipe(
        tap({
          next: () => console.log('Works'),
          error: () => console.log('not'),
        })
      );
  }
  /**
   * getPost
   */
  // public getPost(id: string): Observable<IPost> {
  //   return this.http.get<IPost>(`http://localhost:4000/api/posts/${id}`);
  // }
  /**
   * addPost
   */
  public addPost() {
    return '';
  }

  /**
   * deletePost
   */
  // public deletePost(id: string) {
  //   return this.http
  //     .delete<{ message: 'Successfully deleted' }>(
  //       `http://localhost:4000/api/posts/${id}`
  //     )
  //     .subscribe((response) => response);
  // }
  /**
   * editPost
   */
  public editPost() {
    return '';
  }
}
