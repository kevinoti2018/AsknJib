import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Login } from 'src/app/interface/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MaterialModule } from 'src/app/shared/material/material.module';

@Component({
  selector: 'app-login',
  imports: [CommonModule,MaterialModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private router:Router
    private userService:UserService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      const userData:Login = {
        Email: this.loginForm.get('email')?.value,
        Password: this.loginForm.get('password')?.value
      };

    //  this.router.navigate(['/questions'])
    this.userService.loginUser( userData).subscribe(
        (response)=>{
          console.log("User logged in", response)
          this.authService.login(response)
        },
        (error)=>{
          console.log(error.error);
        }
      )
  
    }
  }
}
