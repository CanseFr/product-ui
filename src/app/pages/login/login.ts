import {Component} from '@angular/core';
import {UserClass} from '../../models/user';
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
  error = false

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  onLoggedIn() {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwt
        if (data.headers.get('Authorization')) {
          jwt = data.headers.get('Authorization')!.split('Bearer ')[1];
          this.authService.saveToken(jwt)
          this.router.navigate(['/'])
        }
      },
      error: (err: any) => {
        this.error = true;
      }
    })
  }

}
