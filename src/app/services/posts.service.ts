import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IPost } from '../components/posts/post/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: IPost[] = [];
  private post!: IPost | any;
  private postsUpdated = new Subject<IPost[]>();
  private postUpdated = new Subject<IPost>();
  constructor(private http: HttpClient, private router: Router) {}
  /**
   * getPosts
   */
  public getPosts() {
    this.http
      .get<IPost[]>('http://localhost:4000/api/posts')
      .subscribe((data) => {
        this.posts = data;
        this.postsUpdated.next([...this.posts]);
      });
  }
  /**
   * getPost
   */
  public getPost<Post>(id: string) {
    this.http
      .get<Post>(`http://localhost:4000/api/posts/${id}`)
      .subscribe((post: Post) => {
        this.post = post;
        this.postUpdated.next(this.post);
      });
  }
  /**
   * getPostUpdateListener
   */
  public getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }
  /**
   * getPostsUpdateListener(
   */
  public getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  /**
   * addPost
   */
  public addPost(title: string, content: string) {
    let _id = String(Math.random() * 5);
    const post: IPost = { _id, title, content };
    this.http
      .post<{ message: string; post: IPost }>(
        'http://localhost:4000/api/posts',
        post
      )
      .subscribe((res) => {
        this.posts.push(res.post);
        this.postsUpdated.next([...this.posts]);
        this.getPosts();
        this.router.navigate(['posts']);
      });
  }
  /**
   * deletePost
   */
  public deletePost(id: string) {
    this.http
      .delete<{ message: 'Successfully deleted' }>(
        `http://localhost:4000/api/posts/${id}`
      )
      .subscribe(() => {
        const filteredPost = this.posts.filter((post) => post._id !== id);
        this.posts = filteredPost;
        this.postsUpdated.next([...this.posts]);
      });
  }
  /**
   * editPost
   */
  public editPost(post: IPost) {
    const { _id, title, content } = post;
    this.http
      .put(`http://localhost:4000/api/posts/${_id}`, {
        title,
        content,
      })
      .subscribe(() => {
        this.postUpdated.next(this.post);
        this.getPosts();
        this.router.navigate(['posts']);
      });
  }
}
