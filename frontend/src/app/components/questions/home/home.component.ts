import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import {  Questions } from 'src/app/interface/questions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { getQuestions, userQuestion } from 'src/app/State/Actions/questionActions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions:Questions[]=[]
  isSidenavOpen = false;

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  constructor(
    private router:Router,
    private store:Store<AppState>,
    ){}
ngOnInit(): void {
  this.store.dispatch(getQuestions())
  this.store.select('question').subscribe(
    (response)=>{
      this.questions= response.questions
    }
  )
  // this.store.dispatch(userQuestion())
  // this.store.select('question').subscribe(
  //   (response)=>{
  //     this.questions =response.questions1
  //     console.log(response);
      
  //   }
  // )
}

  getSingleQuiz(QuestionId: string) {
    this.router.navigate(['/questions', QuestionId]);
  }
  calculateTimeElapsed() {
    const now = new Date();
    this.questions.forEach((question) => {
      const createDate = new Date(question.CreateDate);
      const timeDiff = now.getTime() - createDate.getTime();
      let timeElapsed: string;
  
      if (timeDiff >= 86400000) { // If time difference is greater than or equal to 24 hours (86400000 milliseconds)
        const daysPassed = Math.floor(timeDiff / 86400000);
        timeElapsed = `${daysPassed} day${daysPassed > 1 ? 's' : ''} ago`;
      } else if (timeDiff >= 3600000) { // If time difference is greater than or equal to 1 hour (3600000 milliseconds)
        const hoursPassed = Math.floor(timeDiff / 3600000);
        timeElapsed = `${hoursPassed} hour${hoursPassed > 1 ? 's' : ''} ago`;
      } else { // If time difference is less than 1 hour
        const minutesPassed = Math.floor(timeDiff / 60000);
        timeElapsed = `${minutesPassed} minute${minutesPassed > 1 ? 's' : ''} ago`;
      }
  
      question.TimeElapsed = timeElapsed;
    });
  }
  
}

