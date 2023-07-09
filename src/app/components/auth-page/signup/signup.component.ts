import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent {
  public hide = true;
  constructor(private authService: AuthService) {}
  /**
   * onSubmit
   */
  onSubmit(signUpForm: NgForm) {
    if (signUpForm.invalid) return;
    const { email, password } = signUpForm.value;
    this.authService.signUp(email, password);

    signUpForm.reset();
  }
  getErrorMessage(reason: string) {
    return `${reason} is not valid`;
  }
}
