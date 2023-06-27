import { verifyAdmin, verifyLogin } from './../middleware/verifyLogin';
import { Router } from "express";
import { SearchQuestion, deleteQuestion, downvoteQuestion, getQuestions, getQuestionsByTag, getQuestionsByUserWithTags, getTopQuiz, insertQuestions, updateQuestions, upvoteQuestion } from "../Controllers/questionControllers";

export const routes=Router()
routes.get('/topquiz',verifyLogin,getTopQuiz)
routes.get('/allquestions',verifyLogin,getQuestions)
routes.put('/upvote',verifyLogin,upvoteQuestion)
routes.put('/downvote',verifyLogin,downvoteQuestion)
routes.get('/allquestions/:QuestionId',verifyLogin,SearchQuestion)
routes.post('/ask',verifyLogin,insertQuestions)
routes.put('/update/:QuestionId',verifyLogin,updateQuestions)
routes.get('/userquestions',verifyLogin,getQuestionsByUserWithTags)
routes.put('/deletequestion/:QuestionId',verifyAdmin,deleteQuestion)
routes.get('/tagquestion',verifyLogin,getQuestionsByTag)

