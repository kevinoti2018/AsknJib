import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import {  Questions } from 'src/app/interface/questions';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-allquiz',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule],
  templateUrl: './allquiz.component.html',
  styleUrls: ['./allquiz.component.css']
})
export class AllquizComponent implements OnInit{
 
  isSidenavOpen = false;


  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  question:Questions[]=[]
  constructor(private questionsService:QuestionsService){}
  ngOnInit(): void {
    this.getQuestions()
  }

  getQuestions(){
    this.questionsService.getAllQuestions().subscribe(
      (response)=>{
        this.question=response
      },
      (error:any)=>{
        console.log(error);
        
      }
    )
  }  
}
