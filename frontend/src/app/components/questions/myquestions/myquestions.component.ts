import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/State/appState';
import { userQuestion } from 'src/app/State/Actions/questionActions';
import { Questions } from 'src/app/interface/questions';
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
  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  constructor(private store:Store<AppState>){}
  ngOnInit(): void {
    this.store.dispatch(userQuestion())
    this.store.select('question').subscribe(
      (response)=>{
        this.questions= response.questions1
      }
    )
  }
}
