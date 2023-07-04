import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormsModule,FormGroup, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import {  Questions1 } from 'src/app/interface/questions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { DownvoteQuestion, UpvoteQuestion, getSingleQuestion } from 'src/app/State/Actions/questionActions';
import { AcceptAnswer, AnswerQuestion, DownvoteAnswer, UpvoteAnswer} from 'src/app/State/Actions/answerActions';
import { CommentAnswer } from 'src/app/State/Actions/commentAction';

@Component({

  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  
  // answerForm!: FormGroup;
  commentForm!: FormGroup;

  isSidenavOpen = false;
  question: Questions1| null = null;
  QuestionId:string=''
  comment:string=''
  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  @ViewChild('answerForm', { static: false }) answerForm!: NgForm;
  
  answer: string = '';


  constructor(private route: ActivatedRoute, private store:Store<AppState>, private formBuilder: FormBuilder,) {}
  ngOnInit(): void {
   
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.QuestionId = this.route.snapshot.paramMap.get('QuestionId') as string;

    this.store.dispatch(getSingleQuestion({QuestionId:this.QuestionId}))
    this.store.select('question').subscribe(
     (response)=>{
       this.question=response.singleQuestion
     }
    )
  }
  
acceptAnswer(AnswerId:string){
  this.store.dispatch(AcceptAnswer({AnswerId,QuestionId:this.QuestionId}))
}

UpvoteQuestion(QuestionId:string){
  this.store.dispatch(UpvoteQuestion({QuestionId}))      
}
DownvoteQuestion(QuestionId:string){
  this.store.dispatch(DownvoteQuestion({QuestionId}))
}
UpvoteAnswer(AnswerId:string){
  let QuestionId=this.QuestionId
  this.store.dispatch(UpvoteAnswer({AnswerId,QuestionId}))
}
DownvoteAnswer(event: Event, AnswerId: string) {
  event.stopPropagation(); // Stop event propagation
  
  // console.log(AnswerId);
  let QuestionId = this.QuestionId;
  this.store.dispatch(DownvoteAnswer({ AnswerId, QuestionId }));
}

 
submitComment(AnswerId:string) {
const Comment = this.commentForm?.get('comment')?.value;

// console.log(Comment,AnswerId);
if(Comment){
  this.store.dispatch(CommentAnswer({Comment,AnswerId,QuestionId:this.QuestionId}))
}


}
  // get answerFormControl() {
  //   return this.answerForm.get('answer');
  // }
  SubmitAnswer(){
    // const Answer = this.answerFormControl?.value;
    if (this.answerForm.valid) {
      console.log('submiting after downvotes');
      
      const Answer = this.answerForm.value.answer;
      const QuestionId =this.QuestionId
      this.store.dispatch(AnswerQuestion({ Answer, QuestionId }));
      this.answerForm.resetForm();

    }
    else {
      this.answerForm.control.markAllAsTouched();
    }
   
  //  console.log(Answer);
   
   
    }



}

