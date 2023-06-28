import { createAction, props } from "@ngrx/store"

export const AnswerQuestion=createAction('[Answer] answer question', props<{ Answer:string,QuestionId:string}>())
export const AnswerQuestionSuccess = createAction('[Answer] answer question Success',props<{message:string}>())
export const AnswerQuestionFailure = createAction('[Answer] answer question Failure',props<{error:string}>())

