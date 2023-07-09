import { Component } from '@angular/core';
import { UsersPageService } from '../users-page.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  public users = [];
  constructor(private usersService: UsersPageService) {}

  /**
   * onUsersRequest
   */
  public onUsersRequest(): void {
    const users: any = this.usersService.getAllUsers();
    this.users = users;
    console.log(this.users);
  }
}
