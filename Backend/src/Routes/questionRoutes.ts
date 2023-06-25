import { verifyAdmin, verifyLogin } from './../middleware/verifyLogin';
import { Router } from "express";
import { SearchQuestion, deleteQuestion, getQuestions, getQuestionsByTag, getQuestionsByUserWithTags, getTopQuiz, insertQuestions, updateQuestions } from "../Controllers/questionControllers";

export const routes=Router()
routes.get('/topquiz',getTopQuiz)

routes.get('/allquestions',verifyAdmin,getQuestions)
routes.post('/ask',verifyLogin,insertQuestions)
routes.put('/update/:QuestionId',verifyLogin,updateQuestions)
routes.get('/userquestions',verifyLogin,getQuestionsByUserWithTags)
routes.put('/deletequestion/:QuestionId',verifyLogin,deleteQuestion)
routes.get('/tagquestion/:TagName',verifyLogin,getQuestionsByTag)
routes.get('/question/:QuestionId',verifyAdmin,SearchQuestion)