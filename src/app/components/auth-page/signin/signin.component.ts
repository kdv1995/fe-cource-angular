import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SignInComponent {
  public hide = true;
  constructor(private authService: AuthService) {}
  /**
   * onSubmit
   */
  onSubmit(signInForm: NgForm) {
    if (signInForm.invalid) return;
    const { email, password } = signInForm.value;
    this.authService.signIn(email, password);

    signInForm.reset();
  }
  getErrorMessage(reason: string) {
    return `${reason} is not valid`;
  }
}
