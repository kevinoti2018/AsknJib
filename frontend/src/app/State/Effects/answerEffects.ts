import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AnswersService } from 'src/app/services/answers.service';
import * as AnswerActions from '../Actions/answerActions'
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { getSingleQuestion } from '../Actions/questionActions';
import { Questions1 } from 'src/app/interface/questions';
import { Store } from '@ngrx/store';
import { AppState } from '../appState';

@Injectable()
export class AnswerEffects{
   
    question: Questions1| null = null;
    constructor(private action$:Actions,private answerService:AnswersService, private store:Store<AppState>){}

    answers$ = createEffect(() => {
        let QuestionId = ''
        return this.action$.pipe(
          ofType(AnswerActions.AnswerQuestion),
          mergeMap((action) => {
            QuestionId=action.QuestionId
            return this.answerService.answeQuestion(action.Answer,action.QuestionId).pipe(
            map((response: any) => AnswerActions.AnswerQuestionSuccess({ message: response.message })),
              catchError((error: any) => of(AnswerActions.AnswerQuestionFailure({ error: error })))
            );
          }),
          tap(action => {
            this.store.dispatch(getSingleQuestion({QuestionId}))
      
          })
        );
      });

    upVoteAnswers$ = createEffect(() => {
      let QuestionId = ''
        return this.action$.pipe(
          ofType(AnswerActions.UpvoteAnswer),
          mergeMap((action) => {
            QuestionId=action.QuestionId
            return this.answerService.upvoteAnswer(action.AnswerId).pipe(
            map((response: any) => AnswerActions.UpvoteAnswerSuccess({ message: response.message })),
              catchError((error: any) => of(AnswerActions.UpvoteAnswerFailure({ error: error })))
            );
          }),
          tap(action=>{
            this.store.dispatch(getSingleQuestion({QuestionId}))
          })
          
        );
      });
    AcceptAnswers$ = createEffect(() => {
      let QuestionId = ''
        return this.action$.pipe(
          ofType(AnswerActions.AcceptAnswer),
          mergeMap((action) => {
            QuestionId=action.QuestionId
            return this.answerService.AcceptAnswer(action.AnswerId).pipe(
            map((response: any) => AnswerActions.AcceptAnswerSuccess({ message: response.message })),
              catchError((error: any) => of(AnswerActions.AcceptAnswerFailure({ error: error })))
            );
          }),
          tap(action=>{
            this.store.dispatch(getSingleQuestion({QuestionId}))
          })
          
        );
      });

    downVoteAnswers$ = createEffect(() => {
      let QuestionId = ''
        return this.action$.pipe(
          ofType(AnswerActions.DownvoteAnswer),
          mergeMap((action) => {
            QuestionId=action.QuestionId
            return this.answerService.downvoteAnswer(action.AnswerId).pipe(
            map((response: any) => AnswerActions.DownvoteAnswerSuccess({ message: response.message })),
              catchError((error: any) => of(AnswerActions.DownvoteAnswerFailure({ error: error })))
            );
          }),
          tap(action=>{
            this.store.dispatch(getSingleQuestion({QuestionId}))
          })
        );
      });
}

