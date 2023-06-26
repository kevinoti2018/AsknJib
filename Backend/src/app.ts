
import express from 'express'
import { router } from "./Routes/userRoutes"
import { routes } from './Routes/questionRoutes'
import { answersroutes } from './Routes/answerRoutes';
import { commentRoutes } from './Routes/commentRoutes';
import cors from 'cors'

 const app = express()
 app.use(cors())
app.use(express.json())
app.use('/usersroutes',router)
app.use('/questions',routes)
app.use('/answers',answersroutes)
app.use('/comments',commentRoutes)


export default app