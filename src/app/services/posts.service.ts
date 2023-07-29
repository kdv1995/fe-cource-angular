//Core
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

//Http
import { HttpClient } from '@angular/common/http';
import {
  IPostResponse,
  IPostCreateRequest,
  IPostCreateResponse,
  IPostEditRequest,
  IPostEditResponse,
  IPaginationPostsData,
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
    options: IPaginationPostsData
  ): Observable<IPostResponse> {
    const { pageIndex, pageSize } = options;
    return this.http.get<IPostResponse>(
      `${this.ApiUrl}/posts/postsByPage?page=${pageIndex}&itemsPerPage=${pageSize}`
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
    const userId = localStorage.getItem('userId');
    const newPost = post.reduce(
      (acc: any, elem: any) => {
        elem.title.forEach((title: any) => {
          const { language, translation } = title;
          acc.title.push({ language, translation });
        });

        elem.content.forEach((content: any) => {
          const { language, translation } = content;
          acc.content.push({ language, translation });
        });

        return acc;
      },
      { userId, title: [], content: [] }
    );
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
    console.log(post);
    const { id, title, content } = post;
    const updatedPost: IPostEditRequest = {
      id,
      language: post.title.language,
      title,
      content,
    };
    return this.http.put(`${this.ApiUrl}/posts/${id}`, updatedPost);
  }
}
