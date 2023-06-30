import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { deleteQuestion, userQuestion } from 'src/app/State/Actions/questionActions';
import { Questions, topQuiz } from 'src/app/interface/questions';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user';
import { QuestionsService } from 'src/app/services/questions.service';
@Component({
  selector: 'app-myquestions',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule],
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.css']
})
export class MyquestionsComponent implements OnInit {
  isSidenavOpen = false;
  questions:Questions[]=[]
  questions1:topQuiz|null= null

  user:User|null=null
  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  constructor(private store:Store<AppState>, private userService:UserService, private router:Router, private questionsService:QuestionsService){}
  ngOnInit(): void {
    this.getUser()
    this.store.dispatch(userQuestion())
    this.store.select('question').subscribe(
      (response)=>{
        this.questions= response.questions1
      }
    )
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
  getUser(){
    this.userService.getUser().subscribe(
      (response)=>{
        this.user= response
        console.log(response.Email)
      }
    )
  }
  updateQuestion(QuestionId: string) {
    this.router.navigate(['/questions/upd', QuestionId]);
  }
  getSingleQuiz(QuestionId: string) {
    this.router.navigate(['/questions', QuestionId]);
  }
  deleteQuestion(QuestionId:string){
    this.store.dispatch(deleteQuestion({QuestionId}))
    
  }

}
