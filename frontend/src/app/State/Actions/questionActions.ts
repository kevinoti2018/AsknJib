import { createAction,props } from '@ngrx/store';
import { Asks } from 'src/app/interface/ask';
import { Questions1 ,Questions} from 'src/app/interface/questions';


export const getQuestions = createAction('[Questions] Get Questions',props<{pageSize?:number,pageNumber?:number}>());
export const getQuestionsSuccess = createAction('[Questions] Get Questions Success', props<{ questions: Questions[] }>());
export const getQuestionsFailure = createAction('[Questions] Get Questions Failure', props<{ error: string }>());

export const getSingleQuestion = createAction('[Questions] Get Single Question', props<{ QuestionId: string }>());
export const getSingleQuestionSuccess = createAction('[Questions] Get Single Question Success', props<{ singleQuestion: Questions1 }>());
export const getSingleQuestionFailure = createAction('[Questions] Get Single Question Failure', props<{ error: string }>());

export const updateQuestion = createAction('[Questions] Update Question', props<{ formData:Asks  ,QuestionId:string}>());
export const updateQuestionSuccess = createAction('[Questions] Update Question Success', props<{ message: string }>());
export const updateQuestionFailure = createAction('[Questions] Update Question Failure', props<{ error: string }>());

export const deleteQuestion = createAction('[Questions] Delete Question', props<{ QuestionId: string }>());
export const deleteQuestionSuccess = createAction('[Questions] Delete Question Success', props<{ message: string }>());
export const deleteQuestionFailure = createAction('[Questions] Delete Question Failure', props<{ error: string }>());


export const askQuestion = createAction('[Questions] Ask Question', props<{ formData:Asks }>());
export const askQuestionSuccess = createAction('[Questions] Ask Question Success', props<{ message: string }>());
export const askQuestionFailure = createAction('[Questions] Ask Question Failure', props<{ error: string }>());

export const UpvoteQuestion=createAction('[Question Vote] vote',props<{QuestionId:string}>())
export const UpvoteQuestionSuccess = createAction('[Question Vote] question vote Success',props<{message:string}>())
export const UpvoteQuestionFailure = createAction('[Question Vote] question vote Failure',props<{error:string}>())

export const DownvoteQuestion=createAction('[Question Vote] answer question',props<{QuestionId:string}>() )
export const DownvoteQuestionSuccess = createAction('[Question Vote] question vote Success',props<{message:string}>())
export const DownvoteQuestionFailure = createAction('[Question Vote] question vote Failure',props<{error:string}>())



export const userQuestion = createAction('[Questions] User Question', );
export const userQuestionSuccess = createAction('[Questions] User Question Success',  props<{ questions1: Questions[] }>());
export const userQuestionFailure = createAction('[Questions] User Question Failure', props<{ error: string }>());

