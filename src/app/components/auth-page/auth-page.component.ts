import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {
  queryParamValue: string | null = '' || null;
  anotherQuery: string | null = '';
  constructor(private route: ActivatedRoute) {}
}
