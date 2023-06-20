import { Router } from "express";
import { SearchQuestion, deleteQuestion, getQuestions, getQuestionsByTag, getQuestionsByUserWithTags, insertQuestions } from "../Controllers/questionControllers";

export const routes=Router()
routes.get('/allquestions',getQuestions)
routes.post('/ask/:User_Id',insertQuestions)
routes.get('/userquestions/:User_Id',getQuestionsByUserWithTags)
routes.put('/deletequestion/:QuestionId',deleteQuestion)
routes.get('/tagquestion/:TagName',getQuestionsByTag)

routes.get('/question/:QuestionId',SearchQuestion)