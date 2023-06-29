import { createAction, props } from "@ngrx/store"

export const CommentAnswer=createAction('[Comment] answer question', props<{ Comment:string,AnswerId:string,QuestionId:string}>())
export const CommentAnswerSuccess = createAction('[Comment] answer question Success',props<{message:string}>())
export const CommentAnswerFailure = createAction('[Comment] answer question Failure',props<{error:string}>())

