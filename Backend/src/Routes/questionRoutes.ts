import { verifyAdmin, verifyLogin } from './../middleware/verifyLogin';
import { Router } from "express";
import { SearchQuestion, deleteQuestion, downvoteQuestion, getQuestions, getQuestionsByTag, getQuestionsByUserWithTags, getTopQuiz, insertQuestions, updateQuestions, upvoteQuestion } from "../Controllers/questionControllers";

export const routes=Router()
routes.put('/upvote',verifyLogin,upvoteQuestion)
routes.put('/downvote',verifyLogin,downvoteQuestion)
routes.get('/topquiz',verifyLogin,getTopQuiz)
routes.get('/allquestions',verifyLogin,getQuestions)
routes.get('/allquestions/:QuestionId',verifyLogin,SearchQuestion)
routes.post('/ask',verifyLogin,insertQuestions)
routes.put('/update/:QuestionId',verifyLogin,updateQuestions)
routes.get('/userquestions',verifyLogin,getQuestionsByUserWithTags)
routes.delete('/deletequestion/:QuestionId',verifyLogin,deleteQuestion)
routes.get('/tagquestion',verifyLogin,getQuestionsByTag)

