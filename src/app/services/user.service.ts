import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  tap,
} from 'rxjs';
import {
  IUser,
  IUserSignIn,
  IUserSignUp,
} from '../core/interface/user.interface';
import { environment } from '../environments/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  private ApiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly jwt: JwtService,
    private readonly router: Router
  ) {}

  /**
   * signIn
   */
  public signIn(credentials: {
    email: string;
    password: string;
  }): Observable<{ user: IUserSignIn }> {
    return this.http
      .post<{ user: IUserSignIn }>(`${this.ApiUrl}/signin`, {
        user: credentials,
      })
      .pipe(
        tap(({ user }) => {
          this.setAuth(user);
          // this.setUserId(user);
        })
      );
  }
  /**
   * signUp
   */
  public signUp(credentials: {
    username: string;
    email: string;
    password: string;
  }): Observable<{ user: IUserSignUp }> {
    return this.http
      .post<{ user: IUserSignUp }>(`${this.ApiUrl}/signup`, {
        user: credentials,
      })
      .pipe(tap(({ user }) => this.setAuth(user)));
  }

  /**
   * signOut
   */
  public signOut(): void {
    this.deactivateAuth();
    this.router.navigate(['/']);
  }
  /**
   * getCurrentUser
   */
  public getCurrentUser(): Observable<{ user: IUserSignIn }> {
    return this.http.get<{ user: IUserSignIn }>(`${this.ApiUrl}/user`).pipe(
      tap({
        next: ({ user }) => this.setAuth(user),
        error: () => this.deactivateAuth(),
      }),
      shareReplay(1)
    );
  }

  /**
   * setAuth
   */
  public setAuth(user: IUserSignIn): void {
    this.jwt.setToken(user.accessToken);
    this.currentUserSubject.next(user);
  }
  /**
   * deactivateAuth
   */
  public deactivateAuth(): void {
    this.jwt.removeToken();
    this.currentUserSubject.next(null);
  }
}
