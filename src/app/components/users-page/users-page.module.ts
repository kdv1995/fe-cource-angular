import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UsersPageComponent } from './users-page.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersPageComponent,
  },
];
@NgModule({
  declarations: [UsersComponent, UsersPageComponent],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class UsersPageModule {}
