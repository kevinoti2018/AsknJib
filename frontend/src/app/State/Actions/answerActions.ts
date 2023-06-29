import { createAction, props } from "@ngrx/store"

export const AnswerQuestion=createAction('[Answer] answer question', props<{ Answer:string,QuestionId:string}>())
export const AnswerQuestionSuccess = createAction('[Answer] answer question Success',props<{message:string}>())
export const AnswerQuestionFailure = createAction('[Answer] answer question Failure',props<{error:string}>())

export const UpvoteAnswer=createAction('[Answer] vote',props<{AnswerId:string,QuestionId:string}>())
export const UpvoteAnswerSuccess = createAction('[Answer] answer vote Success',props<{message:string}>())
export const UpvoteAnswerFailure = createAction('[Answer] answer vote Failure',props<{error:string}>())

export const DownvoteAnswer=createAction('[Answer] answer question',props<{AnswerId:string,QuestionId:string}>() )
export const DownvoteAnswerSuccess = createAction('[Answer] answer vote Success',props<{message:string}>())
export const DownvoteAnswerFailure = createAction('[Answer] answer vote Failure',props<{error:string}>())

export const AcceptAnswer=createAction('[Answer] accept answer question',props<{AnswerId:string}>())
export const AcceptAnswerSuccess = createAction('[Answer] accept answer Success',props<{message:string}>())
export const AcceptAnswerFailure = createAction('[Answer] accept answer  Failure',props<{error:string}>())

