
import express from 'express'
import { router } from "./Routes/userRoutes"
import { routes } from './Routes/questionRoutes'
import { answersroutes } from './Routes/answerRoutes';
import { commentRoutes } from './Routes/commentRoutes';

const app = express()
app.use(express.json())

app.use('/usersroutes',router)
app.use('/questions',routes)
app.use('/answers',answersroutes)
app.use('/comments',commentRoutes)
app.listen(4000,()=>{
    console.log('server running')
})

