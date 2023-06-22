import { verifyAdmin, verifyLogin } from './../middleware/verifyLogin';
import { Router } from "express";
import { SearchQuestion, deleteQuestion, getQuestions, getQuestionsByTag, getQuestionsByUserWithTags, getTopQuiz, insertQuestions, updateQuestions } from "../Controllers/questionControllers";

export const routes=Router()
routes.get('/topquiz',getTopQuiz)

routes.get('/allquestions',verifyAdmin,getQuestions)
routes.post('/ask/:User_Id',verifyLogin,insertQuestions)
routes.put('/update/:QuestionId/:User_Id',verifyLogin,updateQuestions)
routes.get('/userquestions/:User_Id',verifyLogin,getQuestionsByUserWithTags)
routes.put('/deletequestion/:QuestionId',verifyLogin,deleteQuestion)
routes.get('/tagquestion/:TagName',verifyLogin,getQuestionsByTag)
routes.get('/question/:QuestionId',verifyAdmin,SearchQuestion)