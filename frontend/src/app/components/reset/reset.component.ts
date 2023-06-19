import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  imports:[ReactiveFormsModule,CommonModule],
  styleUrls: ['./reset.component.css'],
  standalone:true
})
export class ResetComponent implements OnInit {
  resetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.resetForm.valid) {
      const resetUser = {
        email: this.resetForm.get('email')?.value,
        password: this.resetForm.get('password')?.value
      };

     
    }
  }
}
