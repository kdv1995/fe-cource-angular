import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ShowAuthedDirective } from 'src/app/directives/auth-directive.ts.directive';

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
  constructor(private userService: UserService) {}
  currentUser$ = inject(UserService).currentUser;
  signOut(): void {
    this.userService.signOut();
  }
  // .subscribe({
  //       next: () => {
  //         this.loadingService.stopLoading(); // Stop loading after successful navigation
  //         this.router.navigate(['/']);
  //       },
  //       error: (err: Errors) => {
  //         this.errors = err;
  //         this.isSubmitting = false;
  //         this.loadingService.stopLoading(); // Stop loading on error
  //       },
  //     });
}
