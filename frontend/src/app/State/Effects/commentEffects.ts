import { Question } from './../../interface/questions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CommentActions from '../Actions/commentAction'
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../appState';
import { CommentService } from 'src/app/services/comment.service';
import { getSingleQuestion } from '../Actions/questionActions';

@Injectable()
export class CommentEffects{
   
    constructor(private action$:Actions,private commentService:CommentService, private store:Store<AppState>){}

    comments$ = createEffect(() => {
        let QuestionId = ''
        return this.action$.pipe(
          ofType(CommentActions.CommentAnswer),
          mergeMap((action) => {
           QuestionId= action.QuestionId
            return this.commentService.commentAnswer(action.Comment,action.AnswerId).pipe(
            map((response: any) => CommentActions.CommentAnswerSuccess({ message: response.message })),
              catchError((error: any) => of(CommentActions.CommentAnswerFailure({ error: error })))
            );
          }),
          tap(action=>{
            this.store.dispatch(getSingleQuestion({QuestionId}))
          })
        );
      });
}

