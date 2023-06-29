import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Questions } from 'src/app/interface/questions';
import { getQuestions } from 'src/app/State/Actions/questionActions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterModule,FormsModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  _filterstringTag:string=""
  questions:Questions[]=[]
  filterTagArray:Questions[]=[]
  isSidenavOpen = false;
  constructor(private store:Store<AppState> , private router:Router){}
 ngOnInit(): void {
  this.store.dispatch(getQuestions())
  this.store.select('question').subscribe(
    (response)=>{
      this.questions= response.questions
    }
  )
 }
  tagFilter(filterBy:string):Questions[]{
    filterBy=filterBy.toLowerCase()
    return this.questions.filter((question:Questions)=>
      question.Tags.toLocaleString().includes(filterBy)
    )

  }
get filterTag(){
  return this._filterstringTag
}
set filterTag(value:string){
  this._filterstringTag=value
  this.filterTagArray=this.tagFilter(value)
}
getSingleQuiz(QuestionId: string) {
  this.router.navigate(['/questions', QuestionId]);
}


  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
}
