import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  /**
   * setToken
   */
  public setToken(token: string): void {
    window.localStorage['jwtToken'] = token;
  }
  /**
   * getToken
   */
  public getToken(): string {
    return window.localStorage['jwtToken'];
  }
  /**
   * removeToken
   */
  public removeToken(): void {
    window.localStorage.removeItem('jwtToken');
  }
}
