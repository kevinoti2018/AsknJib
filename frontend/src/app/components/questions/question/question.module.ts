import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionComponent } from './question.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TagsComponent } from '../tags/tags.component';
import { AskComponent } from '../ask/ask.component';
import { HomeComponent } from '../home/home.component';
import { MyquestionsComponent } from '../myquestions/myquestions.component';



 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
     {path:'questions', component:HomeComponent},
     {path:'questions/ask', component:AskComponent},
     {path:"questions/tags",component:TagsComponent},
     {path:'questions/:id', component:QuestionComponent},
     {path:'questions/:name', component:MyquestionsComponent}
    ])
  ]
})
export class QuestionModule { }
