import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import {  Questions } from 'src/app/interface/questions';
import { QuestionsService } from 'src/app/services/questions.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { deleteQuestion, getQuestions } from 'src/app/State/Actions/questionActions';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-allquiz',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule,MatPaginatorModule],
  templateUrl: './allquiz.component.html',
  styleUrls: ['./allquiz.component.css']
})
export class AllquizComponent implements OnInit{
 
  isSidenavOpen = false;
  questions:Questions[]=[]

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  question:Questions[]=[]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  handlePageChange(event: PageEvent) {
    console.log(event);
  
    const pageNumber = event.pageIndex + 1;
    const pageSize = event.pageSize;
   this.store.dispatch(getQuestions({pageNumber,pageSize}))
  }

  constructor(private questionsService:QuestionsService
     ,private store:Store<AppState>,){}
  ngOnInit(): void {
    this.store.dispatch(getQuestions({pageNumber:1,pageSize:10}))
  this.store.select('question').subscribe(
    (response)=>{
      this.questions= response.questions
    }
  )
  }
  deleteQuestion(QuestionId:string){
    this.store.dispatch(deleteQuestion({QuestionId}))
  }
}
