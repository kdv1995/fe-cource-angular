import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SignUpComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent,
    title: 'Auth page',
    children: [
      {
        path: 'signin',
        title: 'Sign in',
        component: SignInComponent,
      },
      {
        path: 'signup',
        title: 'Sign up',
        component: SignUpComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthPageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatIconModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AuthPageModule {}
