import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getSingleQuestion, updateQuestion } from 'src/app/State/Actions/questionActions';
import { AppState } from 'src/app/State/appState';
import { Questions1 } from 'src/app/interface/questions';
import { Asks } from 'src/app/interface/ask';

@Component({
  selector: 'app-answers',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent {
  answer!: string;
  isSidenavOpen = false;

  toggleSidenav(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  updateForm!: FormGroup;
  titleControl!: FormControl;
  detailsControl!: FormControl;
  tryDetailsControl!: FormControl;
  expectControl!: FormControl;
  tagsControl!: FormControl;
  QuestionId: string = '';
  question: Questions1 | null = null;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.QuestionId = this.route.snapshot.paramMap.get('QuestionId') as string;

    this.store.dispatch(getSingleQuestion({ QuestionId: this.QuestionId }));
    this.store.select('question').subscribe((response) => {
      this.question = response.singleQuestion;

      if (this.question) {
        console.log(this.question);
        
        this.titleControl = new FormControl(this.question.Title, Validators.required);
        this.detailsControl = new FormControl(this.question.Details, Validators.required);
        this.tryDetailsControl = new FormControl(this.question.Try, Validators.required);
        this.expectControl = new FormControl(this.question.Expect, Validators.required);
        this.tagsControl = new FormControl(this.question.Tags, Validators.required);

        this.updateForm = new FormGroup({
          title: this.titleControl,
          details: this.detailsControl,
          tryDetails: this.tryDetailsControl,
          expect: this.expectControl,
          tags: this.tagsControl,
        });
      }
    });
  }

  submitForm() {
    if (this.updateForm.valid) {
      const formValue = this.updateForm.value;
   
      const formData:Asks= {
        Title: formValue.title,
        Details: formValue.details,
        Try: formValue.tryDetails,
        Expect: formValue.expect,
        Tags: formValue.tags,
      };
      console.log(formData);
      

      this.store.dispatch(updateQuestion({formData,QuestionId:this.QuestionId}))

      console.log('Data updated successfully');
    }
  }

  resetForm() {
    this.updateForm.reset();
  }
}
