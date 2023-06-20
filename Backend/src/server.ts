
import express from 'express'
import { router } from "./Routes/userRoutes"
import { routes } from './Routes/questionRoutes'
import { answerRoutes } from './Routes/answerRoutes';

const app = express()
app.use(express.json())

app.use('/usersroutes',router)
app.use('/questions',routes)
app.use('answers',answerRoutes)
app.listen(4000,()=>{
    console.log('server running')
})

