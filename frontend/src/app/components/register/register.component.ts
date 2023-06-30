import { Register, User } from './../../interface/user';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {  RegisterUser } from 'src/app/State/Actions/userActions';
import { AppState } from 'src/app/State/appState';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports:[ReactiveFormsModule,CommonModule],
  styleUrls: ['./register.component.css'],
  standalone:true
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router:Router,
    private store:Store<AppState>,

  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // confirmPassword: ['', Validators.required]
    
    });
  }

  createUser(): void {
    if (this.registerForm.valid) {
      const newUser:Register= {
        Username: this.registerForm.get('username')?.value,
        Email: this.registerForm.get('email')?.value,
        Password: this.registerForm.get('password')?.value
      };

      // this.userService.registerUser(userData).subscribe(
      //   (response)=>{
      //     console.log(' user created',response)

      //   },
      //   (error) => {
      //     console.log('Error creating user:', error);
      //   }

      // )
      this.store.dispatch(RegisterUser({newUser}))
      this.router.navigateByUrl('/login')
     
    }
  }


}
