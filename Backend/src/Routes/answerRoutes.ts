import { Router } from "express";
import { downvoteAnswer, getAnswersByUserId, insertAnswer, updateAnswerAcceptedStatus, upvoteAnswer } from "../Controllers/answersController";
import { getAnswersByQuestionId } from "../Controllers/answersController";

export const answersroutes =  Router()
// answersroutes.get('/users/:User_Id',getAnswersByUserId)
// answersroutes.post('/answer/:QuestionId/:User_Id',insertAnswer)
// answersroutes.get('/question/:QuestionId',getAnswersByQuestionId)
// answersroutes.patch('/accept/:AnswerId/:User_Id',updateAnswerAcceptedStatus)
answersroutes.patch('/downvote/:AnswerId/:User_Id',downvoteAnswer)
answersroutes.patch('/upvote/:AnswerId/:User_Id',upvoteAnswer)