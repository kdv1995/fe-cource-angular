import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ShowAuthedDirective } from 'src/app/directives/auth-directive.ts.directive';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    NgIf,
    ShowAuthedDirective,
  ],
  standalone: true,
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private readonly router: Router
  ) {}
  currentUser$ = inject(UserService).currentUser;
  signOut(): void {
    this.userService.signOut().subscribe(() => {});
  }
}
