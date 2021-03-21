import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from 'services/authentication.service';
import { UserSessionService } from 'services/usersession.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private sessionService: UserSessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return true;
  }

  hasRequiredPermission(permission) {
    for (let i = 0; i < permission.length; i++) {
      if (permission[i] === this.sessionService.roleId()) {
        return true;
      }
    }
    return false;
  }
}
