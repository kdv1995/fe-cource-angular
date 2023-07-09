import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPost } from './post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post!: IPost;
  @Output() onDeleteEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  deletePost(id: string) {
    this.onDeleteEvent.emit(id);
  }
}
