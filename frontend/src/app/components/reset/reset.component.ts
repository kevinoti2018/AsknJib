import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ResetUser } from 'src/app/State/Actions/userActions';
import { AppState } from 'src/app/State/appState';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  imports:[ReactiveFormsModule,CommonModule,FormsModule],
  styleUrls: ['./reset.component.css'],
  standalone:true
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store:Store<AppState>,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  submit(): void {
    console.log('click');
        
    if (this.resetForm.valid) {
      const emailControl = this.resetForm.get('email');
      if (emailControl) {
        const resetUser = {
          Email: emailControl.value
        };
        console.log(resetUser.Email);
        this.store.dispatch(ResetUser({ Email: resetUser.Email }));
  
        this.store.select(state => state.user.resetSuccessMessage).subscribe(success => {
          if (success) {
            this.router.navigateByUrl('/forgot');
          }
        });
      }
    }
  }
  
  
  
}
