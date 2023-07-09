import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../post.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  private postSub: Subscription = new Subscription();
  public post: IPost = { _id: '', title: '', content: '' };
  public postId!: IPost['_id'];
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id: IPost['_id'] = params['id'];
      this.postsService.getPost(id);
      this.postSub = this.postsService
        .getPostUpdateListener()
        .subscribe((post: IPost) => (this.post = post));
      this.postId = id;
    });
  }
  getErrorMessage(reason: string) {
    return `${reason} is not valid`;
  }

  onEditPost(editForm: NgForm) {
    const { title, content } = editForm.value;
    const updatedPost = { _id: this.postId, title: title, content: content };
    this.postsService.editPost(updatedPost);
  }
  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}
