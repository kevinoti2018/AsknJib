import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuestionsService } from 'src/app/services/questions.service';
import * as QuestionActions from '../Actions/questionActions'
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { getQuestions, getSingleQuestion } from '../Actions/questionActions';
import { Store } from '@ngrx/store';
import { AppState } from '../appState';
@Injectable()
export class QuestionEffects{
    constructor(private action$:Actions,private questionService:QuestionsService,  private store:Store<AppState>){}

    getQuestions$=createEffect(()=>{
        return this.action$.pipe(
            ofType(QuestionActions.getQuestions),
            mergeMap(action=>{
              const {type, ...queries} = action
                return this.questionService.getAllQuestions(queries).pipe(
                    map(questions=>{
                        return QuestionActions.getQuestionsSuccess({questions})
                    }),
                    catchError(error=> of( QuestionActions.getQuestionsFailure({error:error})))
                )
            })
        )
    })

    getQuestion$ = createEffect(() => {
        return this.action$.pipe(
          ofType(QuestionActions.getSingleQuestion),
          mergeMap((action) => {
            return this.questionService.questionDetail(action.QuestionId).pipe(
              map((singleQuestion) => {
                return QuestionActions.getSingleQuestionSuccess({singleQuestion});
              }),
              catchError((error) => of(QuestionActions.getSingleQuestionFailure({ error: error })))
            );
          })
        );
      });


    askQuestion$ = createEffect(() => {
        return this.action$.pipe(
          ofType(QuestionActions.askQuestion),
          mergeMap((action) => {
            return this.questionService.askQuestion(action.formData).pipe(
                map((response: any) => QuestionActions.askQuestionSuccess({ message: response.message })),
              catchError((error) => of(QuestionActions.askQuestionFailure({ error: error })))
            );
          })
        );
      });

      deleteQuestion$ = createEffect(() => {
        return this.action$.pipe(
          ofType(QuestionActions.deleteQuestion),
          mergeMap((action) => {
            return this.questionService.deleteQuestion(action.QuestionId).pipe(
                map((response: any) => QuestionActions.deleteQuestionSuccess({ message: response.message })),
              catchError((error) => of(QuestionActions.deleteQuestionFailure({ error: error })))
            );
          })
        );
      });

      updateQuestion$ = createEffect(() => {
        return this.action$.pipe(
          ofType(QuestionActions.updateQuestion),
          mergeMap((action) => {
            return this.questionService.updateQuestion(action.formData,action.QuestionId).pipe(
            map((response: any) => QuestionActions.updateQuestionSuccess({ message: response.message })),
              catchError((error) => of(QuestionActions.updateQuestionFailure({ error: error })))
            );
          })
        );
      });

      userQuestions$=createEffect(()=>{
        return this.action$.pipe(
            ofType(QuestionActions.userQuestion),
            mergeMap(action=>{
              
                return this.questionService.userQuestions().pipe(
                    map(questions1=>{
                        return QuestionActions.userQuestionSuccess({questions1})
                    }),
                    catchError(error=> of( QuestionActions.getQuestionsFailure({error:error})))
                )
            }),
            tap(action=>{
              // this.store.dispatch(getQuestions())
            })
        )
    })

    downVoteQuestion$ = createEffect(() => {
      let QuestionId = ''
      return this.action$.pipe(
        
        ofType(QuestionActions.DownvoteQuestion),
        mergeMap((action) => {
          QuestionId=action.QuestionId
          return this.questionService.downvoteQuestion(action.QuestionId).pipe(
          map((response: any) => QuestionActions.DownvoteQuestionSuccess({ message: response.message })),
            catchError((error: any) => of(QuestionActions.DownvoteQuestionFailure({ error: error })))
          );
        }),
        tap(action => {
          this.store.dispatch(getSingleQuestion({QuestionId}))
    
        })
       
      );
    });

    upVoteQuestion$ = createEffect(() => {
      let QuestionId = ''
      return this.action$.pipe(
        
        ofType(QuestionActions.UpvoteQuestion),
        mergeMap((action) => {
          QuestionId=action.QuestionId
          return this.questionService.upvoteQuestion(action.QuestionId).pipe(
          map((response: any) => QuestionActions.UpvoteQuestionSuccess({ message: response.message })),
            catchError((error: any) => of(QuestionActions.UpvoteQuestionFailure({ error: error })))
          );
        }),
        tap(action => {
          this.store.dispatch(getSingleQuestion({QuestionId}))
    
        })
       
      );
    });

    }

