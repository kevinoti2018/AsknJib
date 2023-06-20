import { Router } from "express";
import { insertAnswer } from "../Controllers/asnswersController";

export const answerRoutes =  Router()

answerRoutes.post('/answer/:QuestionId/:User_Id',insertAnswer)