import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export class AuthGuard {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.userService.isAuthenticated;

    if (route.data['roles'] && route.data['roles'].includes('free')) {
      return true;
    } else if (isAuthenticated) {
      return true;
    } else {
      return this.router.createUrlTree(['/signin']);
    }
  }
}
