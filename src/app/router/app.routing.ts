import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../components/home/home-page.component').then(
        (m) => m.HomePageComponent
      ),
    title: 'Home page',
  },
  {
    path: 'signin',
    title: 'Sign in',
    loadComponent: () =>
      import('../components/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
  {
    path: 'signup',
    title: 'Sign up',
    loadComponent: () =>
      import('../components/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [
      () => inject(UserService).isAuthenticated.pipe(map((isAuth) => !isAuth)),
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}