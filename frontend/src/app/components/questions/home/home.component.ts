import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import {  Questions, topQuiz } from 'src/app/interface/questions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { getQuestions} from 'src/app/State/Actions/questionActions';
import { LatestPipe } from 'src/app/pipes/latest.pipe';
import {MatPaginator, MatPaginatorModule,PageEvent} from '@angular/material/paginator';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule,LatestPipe,MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions:Questions[]=[]
  questions1:topQuiz|null= null
  isSidenavOpen = false;
  searchTerm: string = ''
  showQuestions: boolean = true;
  isReversed: boolean = false;
  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  handlePageChange(event: PageEvent) {
    console.log(event);
  
    const currentPageIndex = event.pageIndex;
    const pageSize = event.pageSize;
   console.log(currentPageIndex,pageSize);
   
  }
  constructor(
    private router:Router,
    private store:Store<AppState>,
    private questionsService:QuestionsService
    ){}
ngOnInit(): void {
  
    
  this.store.dispatch(getQuestions())
  this.store.select('question').subscribe(
    (response)=>{
      this.questions= response.questions
    },
    (error:any)=>{
      console.log(error.error.message);
      
    }
  )
  this.handleTop()
}
handleTop() {
  this.questionsService.getTopQuestion().subscribe(
    (response)=>{
      this.questions1=response
      
    },
    (error)=>{
      console.log(error);
      
    }
  )
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

