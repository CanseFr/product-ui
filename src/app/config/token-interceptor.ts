import { HttpInterceptorFn } from '@angular/common/http';
import {AuthenticationService} from '../services/authentication.service';
import {inject} from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService)
  const toExclude =["/login","/register"]

  if( !toExclude.includes( req.url)) {
    let jwt = authService.getToken()
    console.log(jwt)
    let reqWithToken = req.clone({
      setHeaders: {Authorization: `Bearer ${jwt}`},
    })
    return next(reqWithToken)
  }
  return next(req);
};
