//Core
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

//Directives
import { NgIf } from '@angular/common';

//Forms
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

//Material modules
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

//Router
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

//Interfaces
import { Errors } from 'src/app/core/interface/error.iterface';
import { AuthForm } from './auth.interface';
import {
  IUserSignInRequest,
  IUserSignUpRequest,
} from 'src/app/core/interface/user.interface';

//Components
import { ListErrorsComponent } from '../shared/lists-errors/list-errors.component';

//Services
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    ListErrorsComponent,
  ],
  standalone: true,
})
export class AuthComponent implements OnInit, OnDestroy {
  hide = true;
  authType: string = '';
  title: string = '';
  authForm: FormGroup<AuthForm>;
  isSubmitting: boolean = false;
  errors: Errors = { errors: {} };
  destroy$ = new Subject<void>();

  constructor(
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
        nonNullable: true,
      }),
    });
  }
  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path;
    this.title = this.authType === 'signin' ? 'Sign in' : 'Sign up';
    if (this.authType === 'signup') {
      this.authForm.addControl(
        'username',
        new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
          ],
          nonNullable: true,
        })
      );
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    let observable =
      this.authType === 'signin'
        ? this.userService.signIn(this.authForm.value as IUserSignInRequest)
        : this.userService.signUp(this.authForm.value as IUserSignUpRequest);

    observable.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err: Errors) => {
        this.errors = err;
        this.isSubmitting = false;
      },
    });
  }
}
