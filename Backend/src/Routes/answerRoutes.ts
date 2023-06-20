import { Router } from "express";
import { insertAnswer, updateAnswerAcceptedStatus } from "../Controllers/answersController";

export const answersroutes =  Router()

answersroutes.post('/answer/:QuestionId/:User_Id',insertAnswer)
answersroutes.patch('/accept/:AnswerId/:User_Id',updateAnswerAcceptedStatus)