import {Component} from '@angular/core';
import {UserClass} from '../../models/user';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

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
  message:string="Login ou mot de passe incorrect !"

  constructor(private authService: AuthenticationService,
              private router: Router,
              ) {
  }

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
        if(err.error.errorCause =="disabled"){
          this.message = 'Utilisateur désactivé !'
        }
        this.error = true;
      }
    });
  }

}
