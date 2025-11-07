import {Injectable} from '@angular/core';
import {UserType} from '../models/user';

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

  signIn(user: UserType): boolean {
    const found = this.users.find(
      (cur) => cur.username === user.username && cur.password === user.password
    );
    if (!found) return false;

    this.loggedUser = found.username ?? '';
    this.isLoggedIn = true;
    this.roles = found.roles ?? [];

    localStorage.setItem('loggedUser', this.loggedUser);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('roles', JSON.stringify(this.roles));

    return true;
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
