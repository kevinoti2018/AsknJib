import { createReducer, on } from "@ngrx/store";
import * as AnswerActions from "../Actions/answerActions";

export interface AnswerInterface {
  Answer: string;
  QuestionId: string;
  AnswerQuestionSuccess: string;
  AnswerQuestionFailure: string;
}

export const initialState: AnswerInterface = {
  Answer: "",
  QuestionId: "",
  AnswerQuestionSuccess: "",
  AnswerQuestionFailure: ""
};

export const answerReducer = createReducer(
  initialState,
  on(AnswerActions.AnswerQuestionSuccess, (state, { message }) => ({
    ...state,
    AnswerQuestionSuccess: message
  })),
  on(AnswerActions.AnswerQuestionFailure, (state, { error }) => ({
    ...state,
    AnswerQuestionFailure: error
  })),
);
