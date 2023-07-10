import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
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
}
