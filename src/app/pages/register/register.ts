import {Component, inject, OnInit} from '@angular/core';
import {UserClass} from '../../models/user';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';

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
  confirmPassword?: string;


  constructor() {
  }

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,  Validators.minLength(6)]],
    confirmPassword : ['', [Validators.required]]
  });

  onRegister(){
    // console.log(this.myForm.value)
  }

}
