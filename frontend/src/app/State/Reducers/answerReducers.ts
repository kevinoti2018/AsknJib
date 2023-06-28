import { createReducer, on } from "@ngrx/store";
import * as AnswerActions from "../Actions/answerActions";

export interface AnswerInterface {
  answer: string;
  questionId: string;
  answerQuestionSuccess: string;
  answerQuestionFailure: string;
  upvoteAnswerSuccess: string;
  upvoteAnswerFailure: string;
  downvoteAnswerFailure: string;
  acceptAnswerSuccess: string;
  acceptAnswerFailure: string;
}

export const initialState: AnswerInterface = {
  answer: "",
  questionId: "",
  answerQuestionSuccess: "",
  answerQuestionFailure: "",
  upvoteAnswerSuccess: "",
  upvoteAnswerFailure: "",
  downvoteAnswerFailure: "",
  acceptAnswerSuccess: "",
  acceptAnswerFailure: "",
};

export const answerReducer = createReducer(
  initialState,
  on(AnswerActions.AnswerQuestionSuccess, (state, { message }) => ({
    ...state,
    answerQuestionSuccess: message,
  })),
  on(AnswerActions.AnswerQuestionFailure, (state, { error }) => ({
    ...state,
    answerQuestionFailure: error,
  })),
  on(AnswerActions.UpvoteAnswerSuccess, (state, { message }) => ({
    ...state,
    upvoteAnswerSuccess: message,
  })),
  on(AnswerActions.UpvoteAnswerFailure, (state, { error }) => ({
    ...state,
    upvoteAnswerFailure: error,
  })),
  on(AnswerActions.DownvoteAnswerFailure, (state, { error }) => ({
    ...state,
    downvoteAnswerFailure: error,
  })),
  on(AnswerActions.AcceptAnswerSuccess, (state, { message }) => ({
    ...state,
    acceptAnswerSuccess: message,
  })),
  on(AnswerActions.AcceptAnswerFailure, (state, { error }) => ({
    ...state,
    acceptAnswerFailure: error,
  }))
);
