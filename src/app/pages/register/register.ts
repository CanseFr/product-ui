import {Component, inject, OnInit} from '@angular/core';
import {UserClass} from '../../models/user';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public user = new UserClass()
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthenticationService);
  confirmPassword?: string;
  err:any;

  constructor() {
  }

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,  Validators.minLength(6)]],
    confirmPassword : ['', [Validators.required]]
  });

  // TODO : Ameliorer cette logique, si client recharge page ou autre, le state disparait, le login n'est plus possible, il faut aller le faire manuellement
  onRegister(){
    this.user.username =this.loginForm.value.username!
    this.user.email =this.loginForm.value.email!
    this.user.password = this.loginForm.value.password!
    this.authService.registerUser(this.user).subscribe({
      next: res => {
        this. authService.setRegisteredUser(this.user);
        alert("veillez confirmer votre email");
        this.router.navigate(["/email-verification"]);
      },
      error: err => {
        if(err.error.errorCode == "USER_EMAIL_ALREADY_EXISTS") {
          this.err = err.error.message;
        }
      }
    })
  }

}
