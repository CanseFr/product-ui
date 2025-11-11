import { HttpInterceptorFn } from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {inject} from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService)
  const toExclude ="/login"

  if(req.url.search(toExclude) === -1) {
    let jwt = authService.getToken()
    let reqWithToken = req.clone({
      setHeaders: {Authorization: `Bearer ${jwt}`},
    })
    return next(reqWithToken)
  }
  return next(req);
};
