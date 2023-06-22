import { verifyLogin } from './../middleware/verifyLogin';
import { Router } from "express";
import { downvoteAnswer, getAnswerById, getAnswersByUserId, insertAnswer, updateAnswerAcceptedStatus, upvoteAnswer } from "../Controllers/answersController";
import { getAnswersByQuestionId } from "../Controllers/answersController";

export const answersroutes =  Router()
answersroutes.get('/answerid/:AnswerId',getAnswerById)
answersroutes.get('/users/:User_Id',verifyLogin,getAnswersByUserId)
answersroutes.post('/answer/:QuestionId/:User_Id',verifyLogin,insertAnswer)
answersroutes.get('/question/:QuestionId',verifyLogin,getAnswersByQuestionId)
answersroutes.patch('/accept/:AnswerId/:User_Id',verifyLogin,updateAnswerAcceptedStatus)
answersroutes.patch('/downvote/:AnswerId/:User_Id',verifyLogin,downvoteAnswer)
answersroutes.patch('/upvote/:AnswerId/:User_Id',verifyLogin,upvoteAnswer)