import { AppModule } from './../../../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionComponent } from './question.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TagsComponent } from '../tags/tags.component';
import { AskComponent } from '../ask/ask.component';
import { HomeComponent } from '../home/home.component';
import { MyquestionsComponent } from '../myquestions/myquestions.component';
import { AnswersComponent } from '../answers/answers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forChild([
     {path:'questions', loadComponent:()=>import('../home/home.component').then(c=>c.HomeComponent)},
     {path:'questions/ask', loadComponent:()=>import('../ask/ask.component').then(c=>c.AskComponent)},
     {path:"questions/tags",loadComponent:()=>import('../tags/tags.component').then(c=>c.TagsComponent)},
     {path:'questions/answers', component:AnswersComponent},
     {path:'questions/specific/:id', component:QuestionComponent},
     {path:'questions/:name', component:MyquestionsComponent},
    
    ])
  ]

}
)
export class QuestionModule { }
