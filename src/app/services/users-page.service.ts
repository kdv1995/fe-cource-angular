import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersPageService {
  public users = [];
  constructor(private http: HttpClient) {}
  /**
   * getAllUsers
   */
  public getAllUsers() {
    this.http
      .get('http://localhost:4000/api/users')
      .subscribe((users: any) => (this.users = users));
  }
}
