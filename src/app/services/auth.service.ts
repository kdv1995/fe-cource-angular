import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ISignIn,
  ISignInResponse,
} from '../components/auth-page/signin/sign-in.interface';
import {
  ISignUp,
  ISignUpResponse,
} from '../components/auth-page/signup/sign-up.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * signUp
   */
  public signUp(email: string, password: string) {
    const userData: ISignUp = { email: email, password: password };
    this.http
      .post<ISignUpResponse>('http://localhost:4000/api/signup', userData)
      .subscribe(() => {
        this.router.navigate(['signup/activate']).then(() => {
          this.refreshPage();
        });
      });
  }

  /**
   * signIn
   */
  public signIn(email: string, password: string) {
    const userData: ISignIn = { email: email, password: password };
    this.http
      .post<ISignInResponse>('http://localhost:4000/api/signin', userData)
      .subscribe((res) => {
        localStorage.setItem('token', res.accessToken);
        this.router.navigate(['']).then(() => {
          this.refreshPage();
        });
      });
  }

  /**
   * signOut
   */
  public signOut() {
    this.http.get('http://localhost:4000/api/signout').subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['']).then(() => {
        this.refreshPage();
      });
    });
  }

  /**
   * refreshPage
   */
  private refreshPage() {
    window.location.reload();
  }
}
