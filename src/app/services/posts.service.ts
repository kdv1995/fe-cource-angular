//Core
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

//Http
import { HttpClient } from '@angular/common/http';
import {
  IPost,
  currentPageRequest,
  IPostResponse,
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
  ): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(
      `${this.ApiUrl}/posts/postsByPage?page=${currentPage}`
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
