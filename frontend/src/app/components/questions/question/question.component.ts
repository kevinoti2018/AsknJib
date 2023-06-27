import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Questions } from 'src/app/interface/questions';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute } from '@angular/router';

@Component({

  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule,FormsModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  answer!:string
  isSidenavOpen = false;

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  question: Questions | null = null;

  constructor(private route: ActivatedRoute, private questionService: QuestionsService) {}
  ngOnInit(): void {
    this.getSingleQuiz()
  }
  getSingleQuiz(){
    const QuestionId = this.route.snapshot.paramMap.get('QuestionId');
    if(QuestionId){
      console.log(QuestionId);
      
      this.questionService.questionDetail(QuestionId).subscribe(
        (response)=>{
          this.question= response
        }
    ,
   
      (error:any)=>{
        console.log(error)
      }
    )
  }}
}
