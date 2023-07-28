//Core
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

//Router
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

//Directives
import { ShowAuthedDirective } from 'src/app/directives/auth-directive.ts.directive';
import { NgFor, NgIf } from '@angular/common';

//Services
import { LanguagesService } from 'src/app/services/languages.service';
import { UserService } from 'src/app/services/user.service';

//Interfaces
import { ILanguages } from './language.interface';
import { LocaleService } from 'src/app/services/locale.service';

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
  currentLanguage: string;
  languages: ILanguages[] = [
    {
      value: 'en',
    },
    {
      value: 'uk',
    },
  ];
  constructor(
    private userService: UserService,
    public languageService: LanguagesService
  ) {}
  currentUser$ = inject(UserService).currentUser;
  signOut(): void {
    this.userService.signOut().subscribe(() => {});
  }
  ngOnInit(): void {
    this.languageService.language$.subscribe(
      (language) => (this.currentLanguage = language)
    );
  }
  switchLanguage(language: string): void {
    this.languageService.setLanguage(language);
  }
}
