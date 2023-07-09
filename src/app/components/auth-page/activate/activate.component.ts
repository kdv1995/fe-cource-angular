import { Component } from '@angular/core';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css'],
})
export class ActivateComponent {
  email: string;

  constructor() {
    this.email = 'tribeofdanel@gmail.com';
  }
}
