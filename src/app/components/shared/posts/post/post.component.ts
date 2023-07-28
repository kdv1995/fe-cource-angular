import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { IPostFiltered } from './post.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [
    DatePipe,
    RouterLink,
    RouterOutlet,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  standalone: true,
})
export class PostComponent {
  constructor(private router: Router) {}
  @Input() post: IPostFiltered;
  editPost(post: IPostFiltered): void {
    this.router.navigate(['posts/edit', post._id], { state: { post } });
  }
}
