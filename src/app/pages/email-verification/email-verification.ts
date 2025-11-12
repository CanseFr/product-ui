import {Component, OnInit} from '@angular/core';
import {UserClass} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-email-verification',
  imports: [
    FormsModule
  ],
  templateUrl: './email-verification.html',
  styleUrl: './email-verification.css',
})
export class EmailVerification implements OnInit {

  code: string = "";
  user: UserClass = new UserClass();
  err = "";

  constructor(private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.authService.getRegisteredUser();
  }

  onValidateEmail(){
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert("Login validé")
        this.authService.login(this.user).subscribe({
          next: (data) => {
            let jwtToken = data.headers.get("Authorization")!;
            this.authService.saveToken(jwtToken);
            this.router.navigate(["/"]);
          },error:(err:any) => {
            console.log(err)
        }
        })
      },
      error:(err:any) => {

        if((err.error.errorCode === "INVALID_TOKEN")){
          this.err = "Votre code n'est pas valide !"
        }

        if((err.error.errorCode === "EXPIRED_TOKEN")){
          this.err = "Votre code à expiré !"
        }
      }
    })
  }

}
