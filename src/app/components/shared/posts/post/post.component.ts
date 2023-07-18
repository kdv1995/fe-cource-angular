import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IPost } from './post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [DatePipe, RouterLink, RouterOutlet],
  standalone: true,
})
export class PostComponent {
  @Input() post: IPost;
}
