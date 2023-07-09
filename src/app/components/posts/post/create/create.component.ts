import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  constructor(public postsService: PostsService) {}
  onAddPost(form: NgForm) {
    if (form.invalid) return;
    const { title, content } = form.value;
    this.postsService.addPost(title, content);
    form.resetForm();
  }
  getErrorMessage(reason: string) {
    return `${reason} is not valid`;
  }
}
