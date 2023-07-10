import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IPost } from '../components/posts/post/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private router: Router) {}
  /**
   * getPosts
   */
  public getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>('http://localhost:4000/api/posts');
  }
  /**
   * getPost
   */
  public getPost(id: string): Observable<IPost> {
    return this.http.get<IPost>(`http://localhost:4000/api/posts/${id}`);
  }
  /**
   * addPost
   */
  public addPost(title: string, content: string) {
    let _id = String(Math.random() * 5);
    const post: IPost = { _id, title, content };
    return this.http.post<{ message: string; post: IPost }>(
      'http://localhost:4000/api/posts',
      post
    );
  }
  /**
   * deletePost
   */
  public deletePost(id: string) {
    return this.http
      .delete<{ message: 'Successfully deleted' }>(
        `http://localhost:4000/api/posts/${id}`
      )
      .subscribe(() => {});
  }
  /**
   * editPost
   */
  public editPost(post: IPost) {
    const { _id, title, content } = post;
    return this.http.put(`http://localhost:4000/api/posts/${_id}`, {
      title,
      content,
    });
  }
}
