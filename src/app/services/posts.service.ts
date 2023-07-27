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
  IPostCreateRequest,
  IPostCreateResponse,
  IPostEditRequest,
  IPostEditResponse,
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
  public addPost(post: IPostCreateRequest[]): Observable<IPostCreateResponse> {
    const newPost: IPostCreateRequest[] = post.reduce(
      (acc: { title: any[]; content: any[]; favourite: number }, elem) => {
        if (!acc.title) acc.title = [];
        if (!acc.content) acc.content = [];

        acc.title.push(elem.title);
        acc.content.push(elem.content);
        favourite: 0;
        return acc;
      },
      {}
    );
    // const newPost: IPostCreateRequest = {
    //   _id: String(Date.now()),
    //   title: post.title,
    //   content: post.content,
    //   favourite: post.favourite,
    // };
    console.log(newPost);
    return this.http.post<IPostResponse>(`${this.ApiUrl}/posts`, newPost);
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
  public editPost(post: IPostEditRequest): Observable<IPostEditResponse> {
    const { _id } = post;
    return this.http.put(`${this.ApiUrl}/posts/${_id}`, post);
  }
}
