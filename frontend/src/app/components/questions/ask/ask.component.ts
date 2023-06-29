import { Asks } from './../../../interface/ask';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { QuestionsService } from 'src/app/services/questions.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { askQuestion } from 'src/app/State/Actions/questionActions';
@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent {
  constructor(private router:Router, private questionsService:QuestionsService, private store:Store<AppState>){

  }
  title: string = '';
  details: string = '';
  tryDetails: string = '';
  expect: string = '';
  tags: string = '';
  isSidenavOpen = false;
  titleControl: FormControl = new FormControl('', Validators.required);
  detailsControl: FormControl = new FormControl('', Validators.required);
  tryDetailsControl: FormControl = new FormControl('', Validators.required);
  expectControl: FormControl = new FormControl('', Validators.required);
  tagsControl: FormControl = new FormControl('', Validators.required);

  showDetails = false;
  showTry = false;
  showExpect = false;
  showTags = false;
  

  goToDetails() {
    this.showDetails = true;
  }

  goToTry() {
    this.showTry = true;
  }

  goToExpect() {
    this.showExpect = true;
  }

  goToTags() {
    this.showTags = true;
  }

  submitForm() {
    
    const title = this.titleControl.value;
    const details = this.detailsControl.value;
    const Try = this.tryDetailsControl.value;
    const expect = this.expectControl.value;
    const tags = this.tagsControl.value;
  

    const formData:Asks = {
      Title: title,
      Details: details,
      Try:Try,
      Expect: expect,
      Tags: tags
    };
   
    this.store.dispatch(askQuestion({formData}))
  }
  
  resetForm() {
    this.titleControl.reset();
    this.detailsControl.reset();
    this.tryDetailsControl.reset();
    this.expectControl.reset();
    this.tagsControl.reset();

    this.showDetails = false;
    this.showTry = false;
    this.showExpect = false;
    this.showTags = false;
  }
  
  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  
}
