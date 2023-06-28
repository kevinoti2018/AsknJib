import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuestionsService } from 'src/app/services/questions.service';
import * as QuestionActions from '../Actions/questionActions'
import { catchError, map, mergeMap, of } from 'rxjs';
@Injectable()
export class QuestionEffects{
    constructor(private action$:Actions,private questionService:QuestionsService){}

    getQuestions$=createEffect(()=>{
        return this.action$.pipe(
            ofType(QuestionActions.getQuestions),
            mergeMap(action=>{
                return this.questionService.getAllQuestions().pipe(
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
                    map(questions=>{
                        return QuestionActions.userQuestionSuccess({questions})
                    }),
                    catchError(error=> of( QuestionActions.getQuestionsFailure({error:error})))
                )
            })
        )
    })

    }

