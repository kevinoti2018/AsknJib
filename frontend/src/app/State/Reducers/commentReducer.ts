import { createReducer, on } from "@ngrx/store";
import * as CommentActions from "../Actions/commentAction";

export interface CommentInterface {
  Comment: string;
  QuestionId: string;
  CommentQuestionSuccess: string;
  CommentQuestionFailure: string;
}

export const initialState: CommentInterface = {
  Comment: "",
  QuestionId: "",
  CommentQuestionSuccess: "",
  CommentQuestionFailure: ""
};

export const CommentReducer = createReducer(
  initialState,
  on(CommentActions.CommentAnswerSuccess, (state, { message }) => ({
    ...state,
    CommentQuestionSuccess: message
  })),
  on(CommentActions.CommentAnswerFailure, (state, { error }) => ({
    ...state,
    CommentQuestionFailure: error
  })),
);
