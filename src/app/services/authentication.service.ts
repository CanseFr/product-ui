import {Injectable} from '@angular/core';
import {UserType} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {apiLogin} from '../config';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  users: UserType[] = [
    {id: 1, username: 'admin', password: 'admin', roles: ['ADMIN']},
    {id: 2, username: 'canse', password: 'admin', roles: ['USER']},
  ];

  public loggedUser: string = '';
  public isLoggedIn = false;
  public roles: string[] = [];
  public token?:string;

  constructor(private http: HttpClient) {
  }


  restoreAuth(): void {
    const u = localStorage.getItem('loggedUser');
    const l = localStorage.getItem('isLoggedIn');
    const r = localStorage.getItem('roles');

    this.loggedUser = u ?? '';
    this.isLoggedIn = l === 'true';

    try {
      this.roles = r ? JSON.parse(r) : [];
      if (!Array.isArray(this.roles)) this.roles = [];
    } catch {
      this.roles = [];
    }
  }

  login(user: UserType) {
    return this.http.post<UserType>(`${apiLogin}`, user, {observe:'response'});
  }

  saveToken(jwt:string){
    localStorage.setItem('jwt', jwt);
    this.token = jwt
    this.isLoggedIn = true
  }

  get isAdmin(): boolean {
    return this.roles?.includes('ADMIN') ?? false;
  }

  signOut(): void {
    this.loggedUser = '';
    this.isLoggedIn = false;
    this.roles = [];

    localStorage.removeItem('loggedUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('roles');
  }

}
