import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import {  Questions } from 'src/app/interface/questions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { getQuestions, userQuestion } from 'src/app/State/Actions/questionActions';
import { LatestPipe } from 'src/app/pipes/latest.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule,LatestPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions:Questions[]=[]
  isSidenavOpen = false;
  searchTerm: string = ''
  showQuestions: boolean = true;
  isReversed: boolean = false;
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

}
handleToggleGroupClick() {
  console.log("Toggle group clicked");
}

handleNewButtonClick() {
  this.store.select('question').subscribe(
    (response) => {
      this.questions = response.questions;
      const reversedArray = this.questions.slice();

      if (this.isReversed) {
        // If currently reversed, restore the original order
        this.questions = reversedArray;
      } else {
        // If not reversed, reverse the order
        this.questions = reversedArray.reverse();
      }

      this.isReversed = !this.isReversed; // Toggle the flag
    }
  );
  console.log("New button clicked");
}



handleUnansweredButtonClick() {
  this.store.select('question').subscribe(
    (response) => {
      this.questions = response.questions.filter((question) => question.AnswerCount === 0);
    }
  );
}

handleQuestionsButtonClick() {
  this.store.select('question').subscribe(
    (response) => {
      this.questions = response.questions
    }
  );
}

handleNewButtonClick1() {
  this.store.select('question').subscribe(
    (response) => {
      this.questions = response.questions.filter((question) => question.AnswerCount === 0);
      this.questions.sort((a, b) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime());
    }
  );
  console.log("New button clicked");
}


  getSingleQuiz(QuestionId: string) {
    this.router.navigate(['/questions', QuestionId]);
  }
  
  
}

