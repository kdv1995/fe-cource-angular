import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {  MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [DatePipe, RouterLink, MatToolbarModule],
  standalone: true,
})
export class FooterComponent {
  today: number = Date.now();
}
