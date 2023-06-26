import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { QuestionsService } from 'src/app/services/questions.service';
import { Question } from 'src/app/interface/questions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule,MaterialModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions:Question[]=[]
  isSidenavOpen = false;

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  constructor(private questionService:QuestionsService){}
ngOnInit(): void {
  this.getAllQuestions()
}
  getAllQuestions(){
    this.questionService.getAllQuestions().subscribe(
      (response)=>{
        this.questions=response
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  
}

