//Core
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'

import { Router } from '@angular/router'
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  tap,
} from 'rxjs'

//Interfaces
import {
  IAllUsers,
  ICurrentUser,
  IUser,
  IUserSignInRequest,
  IUserSignInResponse,
  IUserSignUpRequest,
  IUserSignUpResponse,
} from '../core/interface/user.interface'

//Services
import { JwtService } from './jwt.service'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<ICurrentUser | null>(null)
  public allUser = new BehaviorSubject<IAllUsers | null>(null)

  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged())

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user))

  private ApiUrl = environment.apiUrl

  constructor(
    private readonly http: HttpClient,
    private readonly jwt: JwtService,
    private readonly router: Router,
  ) {}

  /**
   * signIn
   */
  public signIn(
    credentials: IUserSignInRequest,
  ): Observable<{ user: IUserSignInResponse }> {
    return this.http
      .post<{ user: IUserSignInResponse }>(`${this.ApiUrl}/signin`, {
        user: credentials,
      })
      .pipe(tap(({ user }) => this.setAuth(user)))
  }
  /**
   * signUp
   */
  public signUp(
    credentials: IUserSignUpRequest,
  ): Observable<{ user: IUserSignUpResponse }> {
    return this.http
      .post<{ user: IUserSignUpResponse }>(`${this.ApiUrl}/signup`, {
        user: credentials,
      })
      .pipe(tap(({ user }) => this.setAuth(user)))
  }

  /**
   * signOut
   */
  public signOut(): Observable<{ user: IUser }> {
    return this.http.get<{ user: IUser }>(`${this.ApiUrl}/signout`).pipe(
      tap({
        next: () => {
          this.deactivateAuth()
          this.router.navigate(['/'])
        },
        error: () => {
          this.deactivateAuth()
        },
      }),
    )
  }

  /**
   * getCurrentUser
   */
  public getCurrentUser(): Observable<{ user: ICurrentUser }> {
    return this.http.get<{ user: ICurrentUser }>(`${this.ApiUrl}/user`).pipe(
      tap({
        next: ({ user }) => this.setAuth(user),
        error: () => this.deactivateAuth(),
      }),
      shareReplay(1),
    )
  }
  /**
   * getAllUser
   */
  public getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ApiUrl}/users`)
  }

  /**
   * setAuth
   */
  public setAuth(user: ICurrentUser): void {
    localStorage.setItem('userId', user.id)
    this.jwt.setToken(user.accessToken)
    this.currentUserSubject.next(user)
  }
  /**
   * deactivateAuth
   */
  public deactivateAuth(): void {
    this.jwt.removeToken()
    this.currentUserSubject.next(null)
    localStorage.removeItem('userId')
  }
}
