import { AppModule } from './../../../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionComponent } from './question.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MyquestionsComponent } from '../myquestions/myquestions.component';
import { AnswersComponent } from '../answers/answers.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from 'src/app/auth.guard';



 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forChild([
     {path:'questions', loadComponent:()=>import('../home/home.component').then(c=>c.HomeComponent),canActivate: [AuthGuard]},
     {path:'questions/ask', loadComponent:()=>import('../ask/ask.component').then(c=>c.AskComponent),canActivate: [AuthGuard]},
     {path:"questions/tags",loadComponent:()=>import('../tags/tags.component').then(c=>c.TagsComponent),canActivate: [AuthGuard]},
     {path:'questions/myquestions', component:MyquestionsComponent,canActivate: [AuthGuard]},
     {path:'questions/:QuestionId', component:QuestionComponent,canActivate: [AuthGuard]},
     {path:'questions/upd/:QuestionId', component:AnswersComponent,canActivate: [AuthGuard]},
    
    ])
  ]

}
)
export class QuestionModule { }
