import {Injectable} from '@angular/core';
import {UserType} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {apiLogin} from '../config';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public loggedUser: string = '';
  public isLoggedIn = false;
  public roles: string[] = [];
  public token?: string;


  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
  }

  restoreAuth(): void {

    let jwt: any = localStorage.getItem('jwt');
    if (jwt) {
      jwt = this.jwtHelper.decodeToken(jwt)

      this.loggedUser = jwt.sub!
      this.isLoggedIn = true
      this.roles = jwt.roles
    }


    try {
      this.roles = localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')!) : [];
      if (!Array.isArray(this.roles)) this.roles = [];
    } catch {
      this.roles = [];
    }
  }


  login(user: UserType) {
    return this.http.post<UserType>(`${apiLogin}`, user, {observe: 'response'});
  }

  getToken() {
    this.restoreAuth()
    return `Bearer ${this.jwtHelper.tokenGetter()}`
  }

  isTokenExpired(): Boolean {
    return this.jwtHelper.isTokenExpired(this.token!);
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    console.log(decodedToken)
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt.split('Bearer ')[1]);
    this.token = jwt
    this.isLoggedIn = true
    this.decodeJWT();
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  isAdmin():Boolean{
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >=0;
  }

  signOut(): void {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

}
