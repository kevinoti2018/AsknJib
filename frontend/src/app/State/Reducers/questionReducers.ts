import { createReducer, on } from '@ngrx/store';
import * as QuestionActions from '../Actions/questionActions';
import { Questions, Questions1 } from 'src/app/interface/questions';
import { Asks } from 'src/app/interface/ask';

export interface QuestionsState {
  questions: Questions[];
  getQuestionsSuccess: string;
  getQuestionsFailure: string;
  singleQuestion: Questions1|null;
  getSingleQuestionSuccess: string;
  getSingleQuestionsFailure: string;
  deleteQuestionsSuccess: string;
  deleteQuestionsFailure: string;
  updateQuestionSuccess: string;
  updateQuestionFailure: string;
  askQuestionSuccess: string;
  askQuestionFailure: string;
  QuestionId:string
  formData:Asks|null
  userQuestionsSuccess:string,
  userQuestionsFailure:string
  
}

export const initialState: QuestionsState = {
  questions: [],
  getQuestionsSuccess: '',
  getQuestionsFailure: '',
  singleQuestion: null,
  getSingleQuestionSuccess: '',
  getSingleQuestionsFailure: '',
  deleteQuestionsSuccess: '',
  deleteQuestionsFailure: '',
  updateQuestionSuccess: '',
  updateQuestionFailure: '',
  QuestionId:'',
  formData:null,
  askQuestionSuccess: '',
  askQuestionFailure: '',
  userQuestionsSuccess:'',
  userQuestionsFailure:''
};

export const questionsReducer = createReducer(
  initialState,
  on(QuestionActions.getQuestionsSuccess, (state,action) => ({
    ...state,
    questions: action.questions,
    getQuestionsSuccess: 'Success',
    getQuestionsFailure: '',
  })),
  on(QuestionActions.getQuestionsFailure, (state, { error }) => ({
    ...state,
    getQuestionsSuccess: '',
    getQuestionsFailure: error,
  })),
  on(QuestionActions.getSingleQuestion, (state, { QuestionId }) => ({
    ...state,
    QuestionId:QuestionId,
    getQuestionsSuccess: '',
    getQuestionsFailure: '',
  })),

  on(QuestionActions.getSingleQuestionSuccess, (state,{singleQuestion}) => ({
    ...state,
    singleQuestion,
    getSingleQuestionSuccess: 'Success',
    getSingleQuestionsFailure: '',
  })),
  on(QuestionActions.getSingleQuestionFailure, (state, { error }) => ({
    ...state,
    getSingleQuestionSuccess: '',
    getSingleQuestionsFailure: error,
  })),
  on(QuestionActions.deleteQuestionSuccess, (state) => ({
    ...state,
    deleteQuestionsSuccess: 'Success',
    deleteQuestionsFailure: '',
  })),
  on(QuestionActions.deleteQuestionFailure, (state, { error }) => ({
    ...state,
    deleteQuestionsSuccess: '',
    deleteQuestionsFailure: error,
  })),
  on(QuestionActions.updateQuestionSuccess, (state) => ({
    ...state,
    updateQuestionSuccess: 'Success',
    updateQuestionFailure: '',
  })),
  on(QuestionActions.updateQuestionFailure, (state, { error }) => ({
    ...state,
    updateQuestionSuccess: '',
    updateQuestionFailure: error,
  })),
  on(QuestionActions.askQuestionSuccess, (state) => ({
    ...state,
    askQuestionSuccess: 'Success',
    askQuestionFailure: '',
  })),
  on(QuestionActions.askQuestionFailure, (state, { error }) => ({
    ...state,
    askQuestionSuccess: '',
    askQuestionFailure: error,
  })),
  on(QuestionActions.userQuestionSuccess, (state,action) => ({
    ...state,
    questions: action.questions,
    askQuestionSuccess: 'Success',
    askQuestionFailure: '',
  })),
  on(QuestionActions.userQuestionFailure, (state, { error }) => ({
    ...state,
    askQuestionSuccess: '',
    askQuestionFailure: error,
  }))
);
