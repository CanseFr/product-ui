import {Component} from '@angular/core';
import {UserClass, UserType} from '../../models/user';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user: UserClass = new UserClass();
  error=false

  constructor(private authService: AuthenticationService, private router: Router) {}

  onLoggedIn() {
    console.log(this.user);
    let isValidIUser = this.authService.signIn(this.user!);
    if (isValidIUser) {
      this.router.navigate(['/'])
    } else {
      this.error =true
    }
  }

}
