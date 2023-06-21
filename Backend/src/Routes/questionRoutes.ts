import { verifyAdmin, verifyLogin } from './../middleware/verifyLogin';
import { Router } from "express";
import { SearchQuestion, deleteQuestion, getQuestions, getQuestionsByTag, getQuestionsByUserWithTags, insertQuestions } from "../Controllers/questionControllers";

export const routes=Router()
routes.get('/allquestions',verifyAdmin,getQuestions)
routes.post('/ask/:User_Id',verifyLogin,insertQuestions)
routes.get('/userquestions/:User_Id',verifyLogin,getQuestionsByUserWithTags)
routes.put('/deletequestion/:QuestionId',verifyLogin,deleteQuestion)
routes.get('/tagquestion/:TagName',verifyLogin,getQuestionsByTag)
routes.get('/question/:QuestionId',verifyAdmin,SearchQuestion)