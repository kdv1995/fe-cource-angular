import { Component, Input } from '@angular/core';
import { IPost } from './post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
})
export class PostComponent {
  @Input() post: IPost;
}
