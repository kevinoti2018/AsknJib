import express from 'express'
import { router } from "./Routes/userRoutes"

const app = express()
app.use(express.json())

app.use('/usersroutes',router)

app.listen(4000,()=>{
    console.log('server running')
})

