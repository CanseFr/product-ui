import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {inject} from '@angular/core';

export const productGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService)
  const router = inject(Router)
  if (authService.isAdmin()) return true
  else {
    router.navigate(["/not-found"])
    return false;
  }
};
