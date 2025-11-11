import {Component} from '@angular/core';
import {UserClass} from '../../models/user';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user: UserClass = new UserClass();
  error = false

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  // onLoggedIn() {
  //   this.authService.login(this.user).subscribe((ok) => {
  //     if (ok) this.router.navigate(['/']);
  //     else this.error = true;
  //   });
  // }
  onLoggedIn()
  {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.error = true;
      }
    });
  }

}
