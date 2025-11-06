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

  public loggedUser!: string;
  public isLoggedIn = false;
  public roles!: string[];

  signIn(user: UserType) {
    let validUser = false
    this.users.forEach(curUser => {
      if (user.username === curUser.username && user.password === curUser.password) {
        validUser = true
        this.loggedUser = curUser.username!
        this.isLoggedIn = true
        this.roles = curUser.roles!
        localStorage.setItem('loggedUser', this.loggedUser)
        localStorage.setItem('isLoggedIn', String(this.isLoggedIn))
      }
    })
    return validUser;
  }

}
