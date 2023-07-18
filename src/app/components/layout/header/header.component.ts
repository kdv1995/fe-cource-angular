import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { ShowAuthedDirective } from 'src/app/directives/auth-directive.ts.directive';
import { LanguagesService } from 'src/app/services/languages.service';
import { FormsModule } from '@angular/forms';
import { ILanguages } from './language.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

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
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  toggle: boolean = false;
  currentLanguage: string = 'pt';
  // languages: ILanguages[] = [
  //   {
  //     language: 'en',
  //   },
  //   {
  //     language: 'pt',
  //   },
  // ];
  constructor(
    private userService: UserService,
    public languageService: LanguagesService
  ) {
    this.languageService.setLanguage(this.currentLanguage);
    console.log(this.languageService.currentLanguage);
  }
  currentUser$ = inject(UserService).currentUser;
  signOut(): void {
    this.userService.signOut().subscribe(() => {});
  }
  ngOnInit(): void {}
  /**
   * setLanguage
   */
}
