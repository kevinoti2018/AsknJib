import { AnswerInterface } from "./Reducers/answerReducers";
import { CommentInterface } from "./Reducers/commentReducer";
import { QuestionsState } from "./Reducers/questionReducers";
import { UserInterface } from "./Reducers/userReducers";


export interface AppState{
    user:UserInterface
    question:QuestionsState
    answer:AnswerInterface
    comment:CommentInterface
}